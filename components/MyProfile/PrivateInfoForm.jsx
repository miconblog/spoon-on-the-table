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
        const { prefix, lastName, firstName, phone, sex } = values;
        const { photoId, photo, photoIsChanged } = this.state;

        const userInfo = {
          lastName,
          firstName,
          fullName: `${firstName} ${lastName}`,
          sex,
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

        <FormItem label="이름">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'first name' }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem label="성">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'last name' }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem label="성별">
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: '성별을 선택하세요' }],
          })(
            <Select>
              <Option value="male">남성</Option>
              <Option value="female">여성</Option>
            </Select>
          )}
          <p>성별은 통계로 목적으로 사용되며 다른 회원들에게 절대 공개되지 않습니다.</p>
        </FormItem>

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
  mapPropsToFields({ loginUser: { firstName, lastName, phone, sex="선택하세요" } }) {

    let match = [null, null];
    if (phone) {
      match = phone.split('#');
    }

    return {
      firstName: Form.createFormField({ value: firstName }),
      lastName: Form.createFormField({ value: lastName }),
      prefix: Form.createFormField({ value: match[0] }),
      phone: Form.createFormField({ value: match[1] }),
      sex: Form.createFormField({ value: sex }),    
    };
  }
})(PrivateInfoForm);

export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(CreatedForm);