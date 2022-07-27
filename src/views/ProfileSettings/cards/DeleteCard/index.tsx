import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Typography } from 'antd';

const { Text, Title } = Typography;

const DeleteCard = () => (
  <GridCard
    title={<Title level={4}>Delete Account</Title>}
    footer={
      <Button type="primary" danger>
        Delete my account
      </Button>
    }
    content={
      <Text>
        You will no longer be able to sign into the INCLUDE data portal. All of your saved sets and
        queries will be lost. You can create a new account at any time.
      </Text>
    }
  />
);

export default DeleteCard;
