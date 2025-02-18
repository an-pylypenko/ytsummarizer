import {
  Button,
  Form,
  Input,
  Layout,
  Skeleton,
  Space,
  Spin,
  Typography,
} from "antd";
import { FC, useState } from "react";
import { Toaster } from "react-hot-toast";

import { SummarizeDto, SummarizeResponse } from "../../../shared";
import { postSummarize } from "./postSummarize";

import styles from "./styles.module.scss";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<SummarizeResponse | undefined>();

  const submit = async (values: SummarizeDto) => {
    if (values.url) {
      setIsLoading(true);
      setResponse(await postSummarize(values));
      setIsLoading(false);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Toaster />
      <Typography.Title level={3}>Enter Youtube video url</Typography.Title>

      <Form onFinish={submit} layout="horizontal" disabled={isLoading}>
        <Form.Item name="url">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="e.g. https://www.youtube.com/watch?v=<video_id>"
              size="large"
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Summarize
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>

      <Spin spinning={isLoading}>
        {isLoading ? (
          <Skeleton className={styles.response} active></Skeleton>
        ) : (
          response && (
            <div className={styles.response}>
              <Typography.Title level={4}>Topic</Typography.Title>
              <Typography.Paragraph>{response?.topic}</Typography.Paragraph>
              <Typography.Title level={4}>Key points</Typography.Title>
              <ul className={styles["key-points"]}>
                {response?.keyPoints.map((item) => (
                  <li key={item.slice(0, 20)}>{item}</li>
                ))}
              </ul>
              <Typography.Title level={4}>Conclusion</Typography.Title>
              <Typography.Paragraph>
                {response?.conclusion}
              </Typography.Paragraph>
            </div>
          )
        )}
      </Spin>
    </Layout>
  );
};

export { App };
