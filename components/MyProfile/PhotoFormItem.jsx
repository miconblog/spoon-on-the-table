import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import updateUser from './updateUser';
import { Form, Input, Icon, Upload, Row, Col, Button, message } from 'antd';

const FormItem = Form.Item;

class PhotoFormItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: props.defaultImage,
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
      this.props.onUpload && this.props.onUpload({ ...response })
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
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

    const isChanged = !loading && (image !== this.props.defaultImage);

    return (
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
    );
  }
}

export default PhotoFormItem;