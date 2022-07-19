import { LinkedinFilled, MailFilled } from '@ant-design/icons';
import cx from 'classnames';
import Empty from '@ferlab/ui/core/components/Empty';
import { Col, Divider, List, Result, Row, Skeleton, Space, Typography } from 'antd';
import useApi from 'hooks/useApi';
import { useParams } from 'react-router-dom';
import { headers, USER_API_URL } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import Banner from './Banner';

import styles from './index.module.scss';
import AvatarHeader from './AvatarHeader';

const CommunityMember = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, result } = useApi<TUser>({
    config: {
      url: `${USER_API_URL}/${id}`,
      method: 'GET',
      headers: headers(),
    },
  });

  if (!loading && !result) {
    return (
      <Result
        className={styles.notFoundMember}
        status="404"
        title="404"
        subTitle="User not found"
      />
    );
  }

  return (
    <div className={styles.communityMemberWrapper}>
      <div className={styles.banner}>
        <Banner isOwnUser={id === result?.keycloak_id} />
        <AvatarHeader user={result} isLoading={loading} />
        <Divider className={styles.divider} />
        {loading ? (
          <Skeleton
            paragraph={{
              rows: 5,
            }}
          />
        ) : (
          <Row gutter={[80, 28]}>
            <Col md={16}>
              <Row gutter={[28, 28]}>
                <Col span={24}>
                  <Typography.Title level={5}>Role</Typography.Title>
                  <List
                    className={cx(styles.infoList, !result?.roles?.length && styles.empty)}
                    itemLayout="horizontal"
                    dataSource={result?.roles}
                    renderItem={(role, index) => <li key={index}>{role}</li>}
                    locale={{
                      emptyText: (
                        <Empty showImage={false} description="No roles" align="left" noPadding />
                      ),
                    }}
                  />
                </Col>
                <Col span={24}>
                  <Typography.Title level={5}>
                    Intended Use of the INCLUDE Portal data
                  </Typography.Title>
                  <List
                    className={cx(styles.infoList, !result?.roles?.length && styles.empty)}
                    itemLayout="horizontal"
                    dataSource={result?.portal_usages}
                    renderItem={(usage, index) => <li key={index}>{usage}</li>}
                    locale={{
                      emptyText: (
                        <Empty
                          showImage={false}
                          description="No intended use"
                          align="left"
                          noPadding
                        />
                      ),
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Space direction="vertical">
                {result?.linkedin && (
                  <Space align="center">
                    <LinkedinFilled />
                    <Typography.Text>Linkedin</Typography.Text>
                  </Space>
                )}
                <Space align="center">
                  <MailFilled />
                  <Typography.Text>{result?.email}</Typography.Text>
                </Space>
              </Space>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default CommunityMember;
