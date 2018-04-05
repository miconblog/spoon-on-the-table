import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import updateUser from './updateUser';
import { Form, Input, Icon, Select, Row, Col, Button, Divider } from 'antd';
import PhotoFormItem from './PhotoFormItem';

const FormItem = Form.Item;
const Option = Select.Option;

class PrivateInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoId: '',
      photo: '',
      photoIsChanged: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { loginUser, dispatch } = this.props;
        const { prefix, lastName, firstName, phone } = values;
        const { photoId, photo, photoIsChanged } = this.state;

        const userInfo = {
          lastName,
          firstName,
          fullName: `${firstName} ${lastName}`,
          phone: `${prefix}#${phone}`
        };

        if (photoIsChanged) {
          userInfo.photo = {
            __type: 'Pointer',
            className: 'Photo',
            objectId: photoId,
            image: photo
          }
        }

        const user = await updateUser(loginUser.objectId, userInfo, dispatch);
      }
    });
  }

  handleUpload = (resp) => {
    this.setState({
      photoIsChanged: true,
      photo: resp.image,
      photoId: resp.objectId
    });
  }

  render() {
    const { loginUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '82',
    })(
      <Select style={{ width: 70 }}>
        <Option value="82">+82</Option>
      </Select>
    );

    return (
      <Form className="PrivateInfoForm" onSubmit={this.handleSubmit}>
        <FormItem>
          가입한 이메일 주소는 <strong>{loginUser.email}</strong> 입니다.
        </FormItem>

        <PhotoFormItem defaultImage={loginUser.photo.image} onUpload={this.handleUpload} />

        <Row>
          <Col span={11}>
            <FormItem label="성">
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'last name' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col  span={2}>
          </Col>
          <Col span={11}>
            <FormItem label="이름">
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'first name' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem label="휴대전화">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'phone number' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem style={{ paddingTop: '50px' }}>
          <Button className="full-width-button" type="primary" htmlType="submit">저장</Button>
        </FormItem>
      </Form>
    );
  }
}

const CreatedForm = Form.create({
  mapPropsToFields({ loginUser: { firstName, lastName, phone } }) {

    let match = null;
    if (phone) {
      match = phone.split('#');
    }

    return {
      firstName: Form.createFormField({ value: firstName }),
      lastName: Form.createFormField({ value: lastName }),
      prefix: Form.createFormField({ value: match[0] }),
      phone: Form.createFormField({ value: match[1] })
    };
  }
})(PrivateInfoForm);

export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(CreatedForm);