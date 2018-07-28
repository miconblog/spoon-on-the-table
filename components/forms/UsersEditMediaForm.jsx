import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import { Form, Icon, Upload, Button, message } from 'antd';
import updateUser from './updateUser';
import './UsersEditMediaForm.less';

const FormItem = Form.Item;

class UsersEditMediaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: props.defaultImage,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { loginUser, dispatch } = this.props;
        const { prefix, lastName, firstName, phone, sex } = values;
        const { photoId, photo } = this.state;

        const userInfo = {
          lastName,
          firstName,
          fullName: `${firstName} ${lastName}`,
          sex,
          phone: `${prefix}#${phone}`,
          photo: {
            __type: 'Pointer',
            className: 'Photo',
            objectId: photoId,
            image: photo,
          },
        };

        await updateUser(loginUser.objectId, userInfo, dispatch);
      }
    });
  };

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

    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ image: e.target.result });
    };
    reader.readAsDataURL(file);

    return true;
  };

  handleChange = (info) => {
    const { status, response } = info.file;
    this.setState({ loading: status === 'uploading' });

    if (status === 'done') {
      this.setState({ ...response });
      this.props.onUpload && this.props.onUpload({ ...response });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { image, loading } = this.state;

    const props = {
      name: 'file',
      action: '/api/file/upload',
      data: {
        from: 'profile',
      },
      withCredentials: true,
      showUploadList: false,
      beforeUpload: this.handleBeforeUpload,
      onChange: this.handleChange,
    };

    const isChanged = !loading && image !== this.props.defaultImage;

    return (
      <Form className="UsersEditMediaForm" onSubmit={this.handleSubmit}>
        <FormItem className="PhotoFormItem">
          <div>
            <img
              alt="profile photo"
              style={{ width: '150px' }}
              src={this.state.image}
            />
          </div>
          <Upload {...props}>
            {!isChanged && (
              <Button disabled={loading}>
                <Icon type={loading ? 'loading' : 'picture'} /> 사진 업로드
              </Button>
            )}
          </Upload>
        </FormItem>
      </Form>
    );
  }
}

export default UsersEditMediaForm;
