import React from 'react';
import { Card, Row, Col, Form, Icon, Upload, Button, message } from 'antd';
import updateUser from './updateUser';
import './UsersEditMediaForm.less';

const FormItem = Form.Item;

class UsersEditMediaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      image: props.defaultImage,
      photos: [...props.photos],
    };
  }

  isChanged = () => {
    const { defaultImage } = this.props;
    const { image } = this.state;

    return image !== defaultImage;
  };

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
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleChangePhoto = (photo) => {
    this.setState({
      image: photo.image,
    });
  };

  render() {
    const { photos, image, loading } = this.state;

    return (
      <main className="UsersEditMediaForm">
        <Card title="프로필 사진">
          <Row className="pannel-body" type="flex" justify="start">
            <Col className="col-profile-image">
              <div>
                <img alt="profile" style={{ width: '150px' }} src={image} />
              </div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem className="btn-change-photo">
                  <Button type="primary" disabled={!this.isChanged()}>
                  프로필 사진 변경
                  </Button>
                </FormItem>
              </Form>
            </Col>
            <Col className="col-image-list">
              <ul>
                {photos.map((photo, idx) => (
                  <li
                    key={photo.id}
                    onClick={() => this.setState({ image: photo.image })}
                  >
                    <img
                      width={50}
                      height={50}
                      alt={`profile ${idx + 1}`}
                      src={photo.image}
                    />
                  </li>
                ))}

                <Upload
                  name="file"
                  action="/api/file/upload"
                  data={{
                    from: 'profile',
                  }}
                  withCredentials
                  showUploadList={false}
                  beforeUpload={this.handleBeforeUpload}
                  onChange={this.handleChange}
                >
                  <Button disabled={loading} className="btn-upload">
                    <Icon type={loading ? 'loading' : 'camera'} />
                  </Button>
                </Upload>
              </ul>
            </Col>
          </Row>
        </Card>
      </main>
    );
  }
}

export default UsersEditMediaForm;
