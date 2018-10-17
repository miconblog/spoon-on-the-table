import React from 'react';
import Router from 'next/router';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import PhotoList from './PhotoList';
import { saveTableCache, deletePhoto } from '../../utils/api';
import constants from '../constants';

const FormItem = Form.Item;
const { Option } = Select;

class StepMenuForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      photos: props.cache.tablePhotos || [],
    };
  }

  handleChangePhotos = async (photos) => {
    const {
      loginUser: { sessionToken },
    } = this.props;
    await saveTableCache({ tablePhotos: photos, hasPhoto: true }, sessionToken);
  };

  handleDeletePhoto = async (file, photos) => {
    const {
      loginUser: { sessionToken },
    } = this.props;
    await saveTableCache({ tablePhotos: photos, hasPhoto: true }, sessionToken);
    await deletePhoto(file.id, { sessionToken });
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
        const clone = { ...values };

        this.setState({ loading: true });
        await saveTableCache(
          { table: { ...cache.table, ...clone } },
          loginUser.sessionToken
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
              />
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
                <Option value="none">{constants.alcohol.none}</Option>
                <Option value="share">{constants.alcohol.share}</Option>
                <Option value="include">{constants.alcohol.include}</Option>
                <Option value="include,share">{constants.alcohol['include,share']}</Option>
              </Select>
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
