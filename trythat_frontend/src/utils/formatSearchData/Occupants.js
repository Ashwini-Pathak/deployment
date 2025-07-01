import dayjs from 'dayjs';
import { sortBy, filter } from 'lodash';

export const FormatOccupantsData = (data) => {
  const occupantData = [];
  for (let index = 0; index < data?.length; index++) {
    let element = {};
    if (data?.[index]?.address?.unitNo != null) {
      let filteredDataByFlatNo = filter(
        data,
        (item) =>
          item?.address?.unitNo === data?.[index]?.address?.unitNo &&
          item?.address?.floorNo === data?.[index]?.address?.floorNo,
      );
      let sortedDataByFlatNo = sortBy(filteredDataByFlatNo, (item) => item?.registrationDate);
      if (
        occupantData.findIndex(
          (item) =>
            item?.id === sortedDataByFlatNo?.[sortedDataByFlatNo?.length - 1]?._id ||
            (item?.unitNo === sortedDataByFlatNo?.[sortedDataByFlatNo?.length - 1]?.address?.unitNo &&
              item?.floorNo === sortedDataByFlatNo?.[sortedDataByFlatNo?.length - 1]?.address?.floorNo),
        ) >= 0
      )
        continue;
      element = {
        floorNo: data?.[index]?.address?.floorNo,
        unitNo: data?.[index]?.address?.unitNo,
        transactionType: data?.[index]?.documentType,
        registrationDate: dayjs(data?.[index]?.registrationDate).format('DD-MM-YYYY'),
        id: data?.[index]?._id,
        occupantName: data?.[index]?.purchaserInfo?.[0]?.occupantName,
        organizationId: data?.[index]?.address?.organizationId,
        isPerson: data?.[index]?.purchaserInfo?.[0]?.isPerson,
        expiryDate: data?.[index]?.expiryDate,
        personName: data?.[index]?.purchaserInfo?.[0]?.personName,
        companyName: data?.[index]?.purchaserInfo?.[0]?.companyName,
        documentType: data?.[index]?.documentType,
      };
    } else {
      element = {
        floorNo: data?.[index]?.address?.floorNo,
        unitNo: data?.[index]?.address?.unitNo,
        transactionType: data?.[index]?.documentType,
        registrationDate: dayjs(data?.[index]?.registrationDate).format('DD-MM-YYYY'),
        id: data?.[index]?._id,
        occupantName: data?.[index]?.purchaserInfo?.[0]?.occupantName,
        organizationId: data?.[index]?.address?.organizationId,
        isPerson: data?.[index]?.purchaserInfo?.[0]?.isPerson,
        expiryDate: data?.[index]?.expiryDate,
        personName: data?.[index]?.purchaserInfo?.[0]?.personName,
        companyName: data?.[index]?.purchaserInfo?.[0]?.companyName,
        documentType: data?.[index]?.documentType,
      };
    }
    occupantData.push(element);
  }
  return occupantData;
};
