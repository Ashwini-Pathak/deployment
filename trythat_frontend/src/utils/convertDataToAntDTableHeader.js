import { Button, Space } from 'antd';

export const convertDataToAntDTableHeader = (headers, callbackFnc, handleNavigate) => {
  return headers.map((el) => {
    if (el.key === 'action') {
      return {
        title: '',
        dataIndex: el?.key,
        render: (_, render) => (
          <Space size="middle">
            <Button type="primary" onClick={() => callbackFnc(el?.key, true, render)}>
              Share Feedback{' '}
            </Button>
            <Button type="link" onClick={() => handleNavigate(render)}>
              View More
            </Button>
            {/* <img src={ShareIcon} alt="Share Icon" style={{ alignSelf: 'end' }} /> */}
          </Space>
        ),
      };
    }
    return {
      title: el?.title,
      dataIndex: el?.dataIndex,
    };
  });
};
