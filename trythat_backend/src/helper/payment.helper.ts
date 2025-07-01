import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class PaymentHelper {
  private readonly secretKey;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get('JUSPAY_RESPONSE_KEY');
  }

  verifyHmacSignature(payload): Boolean {
    let paramsList = {};
    for (var key in payload) {
      if (key != 'signature' && key != 'signature_algorithm') {
        paramsList[key] = payload[key];
      }
    }

    paramsList = this.sortObjectByKeys(paramsList);

    var paramsString = '';
    for (var key in paramsList) {
      paramsString = paramsString + key + '=' + paramsList[key] + '&';
    }

    let encodedParams = encodeURIComponent(paramsString.substring(0, paramsString.length - 1));
    let computedHmac = createHmac('sha256', this.secretKey).update(encodedParams).digest('base64');
    let receivedHmac = decodeURIComponent(payload.signature);

    return decodeURIComponent(computedHmac) == receivedHmac;
  }

  sortObjectByKeys(o) {
    return Object.keys(o)
      .sort()
      .reduce((r, k) => ((r[k] = o[k]), r), {});
  }
}
