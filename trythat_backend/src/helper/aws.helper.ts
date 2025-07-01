import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { createDecipheriv } from 'crypto';

@Injectable()
export class AwsService {
  private readonly s3: AWS.S3;
  private readonly kms: AWS.KMS;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    this.kms = new AWS.KMS({
      accessKeyId: this.configService.get('AWS_KMS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_KMS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadImageToS3(imagePayload, bucketName, fileName): Promise<string> {
    const buffer = imagePayload.buffer;
    const { mimetype } = imagePayload;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: mimetype,
    };

    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  async retrieveAndDecryptFile(bucketName: string, key: string, encryptionKey: string) {
    try {
      // Retrieve the encrypted file data and encrypted DEK from S3
      const [encryptedFileData, encryptedDataKey] = await Promise.all([
        this.s3.getObject({ Bucket: bucketName, Key: key }).promise(),
        this.s3.getObject({ Bucket: bucketName, Key: encryptionKey }).promise(),
      ]);

      // Decrypt the encrypted DEK with KMS
      const decryptParams = {
        CiphertextBlob: encryptedDataKey.Body as Buffer,
      };
      const decryptedDataKey = await this.kms.decrypt(decryptParams).promise();

      // Decrypt the file data with the decrypted DEK
      const decryptedFileBufferData = this.decryptData(
        encryptedFileData.Body as Buffer,
        decryptedDataKey.Plaintext as Buffer,
      );

      return decryptedFileBufferData;
    } catch (error) {
      console.error('Error retrieving and decrypting file:', error);
    }
  }

  // Function to decrypt data using a data encryption key (DEK)
  private decryptData(data: Buffer, key: Buffer): Buffer {
    // Extract the initialization vector (IV) from the beginning of the encrypted data
    const iv = data.slice(0, 16);

    // Extract the encrypted data (excluding the IV)
    const encryptedData = data.slice(16);

    // Create a Decipher object with AES algorithm and the provided key and IV
    const decipher = createDecipheriv('aes-256-cbc', key, iv);

    // Update the decipher with the encrypted data
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    return decryptedData;
  }
}
