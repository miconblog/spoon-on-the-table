import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import updateUser from './updateUser';
import { Form, Input, Icon, Upload, Row, Col, Button, message } from 'antd';

const FormItem = Form.Item;

class PhotoForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: props.loginUser.photo.image,
      size: 0,
      key: null
    }
  }

  handleBeforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';

    if (!isJPG && !isPNG) {
      message.error('You can only upload JPG or PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }

    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ image: e.target.result })
    };
    reader.readAsDataURL(file);

    return true;
  }

  handleChange = (info) => {

    const { status, response } = info.file;
    this.setState({ loading: status === 'uploading' });

    if (status === 'done') {
      this.setState({ ...response });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll( async err => {
      if (!err) {
        const { loginUser, dispatch } = this.props;
        const { objectId, image } = this.state;

        const user = await updateUser(loginUser.objectId, {
          photo: {
            __type: 'Pointer',
            className: 'Photo',
            objectId,
            image
          }
        }, dispatch);
      }
    });
  }

  render() {
    const { loginUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { image, loading } = this.state;

    const props = {
      name: 'file',
      action: '/api/file/upload',
      data: {
        from: 'profile'
      },
      withCredentials: true,
      showUploadList: false,
      beforeUpload: this.handleBeforeUpload,
      onChange: this.handleChange
    };

    const isChanged = !loading && (image !== loginUser.photo.image);

    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingLeft: '20px' }}>
        <FormItem>
          <Col span={10}>
            <img alt="profile photo" style={{ width: '150px' }} src={this.state.image} />
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Upload {...props}>
              {!isChanged &&
                <Button disabled={loading}>
                  <Icon type={loading ? "loading" : "picture"} /> 사진 업로드
              </Button>
              }
            </Upload>
          </Col>
        </FormItem>

        <FormItem>
          <Button
            disabled={!isChanged}
            type="primary"
            htmlType="submit">사진 변경</Button>
        </FormItem>
      </Form>
    );
  }
}

const CreatedForm = Form.create()(PhotoForm);
export default connect((state) => {
  return {
    loginUser: state.loginUser
  };
})(CreatedForm);