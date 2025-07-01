import { Result, Button } from 'antd';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          Back Home
        </Button>
      }
    />
  );
}

export default ErrorFallback;
