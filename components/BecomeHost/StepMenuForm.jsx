import React from 'react';
import Router from 'next/router';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import PhotoList from './PhotoList';
import { saveTableCache, deletePhoto } from '../../utils/api';

const FormItem = Form.Item;
const { Option } = Select;

class StepMenuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      photos: props.cache.table.photos || [],
    };
  }

  handleChangePhotos = async (photos) => {
    const {
      cache,
      loginUser: { sessionToken },
    } = this.props;
    await saveTableCache({ table: { ...cache.table, photos } }, sessionToken);
    // this.setState({ photos });
  };

  handleDeletePhoto = async (file, photos) => {
    const {
      cache,
      loginUser: { sessionToken },
    } = this.props;
    await saveTableCache({ table: { ...cache.table, photos } }, sessionToken);
    await deletePhoto(file.id, { sessionToken });
    // this.setState({ photos });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      loginUser,
      cache,
    } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        const { photos } = this.state;
        const clone = { ...values };
        clone.photos = [...photos];

        console.log(cache.table, clone);

        this.setState({ loading: true });
        await saveTableCache(
          { table: { ...cache.table, ...clone } },
          loginUser.sessionToken,
        );
        Router.push('/become-a-host?step=location', '/become-a-host/location');
      }
    });
  };

  handleGoBack = (e) => {
    e.preventDefault();
    Router.push('/become-a-host?step=index', '/become-a-host');
  };

  render() {
    const {
      form: { getFieldDecorator },
      cache: {
        table: { title = '', explainTheMenu = '', alcohol = 'none' },
      },
    } = this.props;
    const { loading, photos } = this.state;

    return (
      <div className="StepMenuForm">
        <Form onSubmit={this.handleSubmit}>
          <strong>테이블 제목</strong>
          <FormItem>
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{ required: true, message: '테이블 제목이 필요합니다.' }],
            })(<Input placeholder="테이블 제목을 입력해주세요." />)}
          </FormItem>

          <p>
            테이블에는 어떤 음식들이 올라가나요? 사진과 함께 설명을 넣어주세요.
          </p>
          <PhotoList
            photos={[...photos]}
            onRemove={this.handleDeletePhoto}
            onChange={this.handleChangePhotos}
          />
          <FormItem>
            {getFieldDecorator('explainTheMenu', {
              initialValue: explainTheMenu,
              rules: [
                { required: true, message: '설명은 반드시 입력해야합니다.' },
              ],
            })(
              <Input.TextArea
                rows={5}
                placeholder="메뉴에 대한 설명을 자유롭게 넣어주세요."
              />,
            )}
          </FormItem>

          <div>주류가 포함되어 있나요?</div>
          <FormItem>
            {getFieldDecorator('alcohol', {
              initialValue: alcohol,
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Select>
                <Option value="none">
                  주류는 포함되어 있지않습니다. (반입금지)
                </Option>
                <Option value="share">
                  주류는 포함되어 있지않으나 가지고 오시면 같이 마셔야 합니다.
                </Option>
                <Option value="include">
                  주류가 포함되어 있으므로 따로 가지고 오지마세요.
                </Option>
                <Option value="include,share">
                  주류가 포함되어 있지만 가지고 오셔서 나눠마셔도 됩니다.
                </Option>
              </Select>,
            )}
          </FormItem>

          <FormItem>
            <Row type="flex" justify="space-between">
              <Col>
                <a
                  onClick={this.handleGoBack}
                  href="/become-a-host"
                  className="ant-btn ant-type-ghost"
                >
                  이전
                </a>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={loading ? 'loading' : ''}
                >
                  다음
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(StepMenuForm);
