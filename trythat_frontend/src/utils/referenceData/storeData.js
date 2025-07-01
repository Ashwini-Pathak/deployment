export const getStorePointsData = () => {
  const payload = {
    storePoints: [
      {
        storePointsId: 1,
        points: "500",
        price: 1000,
        quantity: 0,
        enabled: true,
      },
      {
        storePointsId: 2,
        points: "1000",
        price: 2500,
        quantity: 0,
        enabled: true,
      },
      {
        storePointsId: 3,
        points: "2000",
        price: 3500,
        quantity: 0,
        enabled: true,
      },
      {
        storePointsId: 4,
        points: "3000",
        price: 4500,
        quantity: 0,
        enabled: true,
      },
      {
        storePointsId: 5,
        points: "2000",
        price: 5500,
        quantity: 0,
        enabled: false,
      },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 2000);
  });
};
