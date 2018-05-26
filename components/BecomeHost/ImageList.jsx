import React from 'react';
import { Upload, Icon, Spin, Popconfirm } from 'antd';
import { saveTableCache, deletePhoto } from '../../utils/api';
import './ImageList.less'

const Card = ({ file, onSelect, onRemove, isSelected }) => (
  <div className={`image-list-card ant-upload-list-item ant-upload-list-picture-card ${isSelected ? 'selected' : ''}`}>
    <div className="item-info ant-upload-list-item-info" onClick={onSelect}>
      <span className={file.status}>
        {file.status === 'uploading'
          ? <Icon type="loading" style={{ fontSize: 24 }} spin />
          : <a className="ant-upload-list-item-thumbnail" href={file.image}><img src={`/image/${file.id}`} alt={file.name} /></a>
        }
      </span>
    </div>
    <Popconfirm title="정말로 삭제할까요?"
      onConfirm={() => onRemove(file)}
      okText="삭제" cancelText="아니오">
      <span className="item-actions">
        <i title="Remove file" className="anticon anticon-delete" />
      </span>
    </Popconfirm>
  </div>
)

const FileList = ({ files, onSelect, onRemove, selectedId }) => (
  <div className="image-list ant-upload-list ant-upload-list-picture-card">
    {files.map(file => (
      <Card
        key={file.uid}
        file={file}
        isSelected={selectedId === file.id}
        onSelect={() => onSelect(file)}
        onRemove={() => onRemove(file)}
      />
    ))}
  </div>
)

export default class ImageList extends React.Component {

  constructor(props) {
    super(props);

    const { photos = [] } = props.cache;

    this.state = {
      previewVisible: false,
      previewImage: '',
      selectedId: '',
      fileList: photos.map((photo, idx) => {
        return {
          uid: idx,
          id: photo.id,
          name: photo.name,
          status: 'done',
          thumbUrl: `/image/${photo.id}`,
          url: photo.url
        }
      }),
    };

  }

  handleSelectCard = (file) => {
    if (this.state.selectedId === file.id) {
      return this.setState({
        previewVisible: false,
        previewImage: '',
        selectedId: ''
      })
    }

    this.setState({
      previewVisible: true,
      previewImage: file.url,
      selectedId: file.id
    })
  }

  handleRemoveCard = async (file) => {
    const { cache, sessionToken } = this.props;
    const photos = this.state.fileList.filter(f => f.id !== file.id)
    this.setState({ fileList: photos });

    await saveTableCache({ table: { ...cache, photos } }, sessionToken);
    await deletePhoto(file.id, { sessionToken: this.props.sessionToken });
  }

  handleChange = async ({ fileList }) => {

    const { cache, sessionToken } = this.props;
    const images = fileList.map(({ id, uid, status, name, url, thumbUrl, response }) => {

      const image = { id, uid, status, name, url, thumbUrl };

      if (response) {
        image.id = response.id;
        image.thumbUrl = `/image/${response.id}`
        image.url = response.image
      }

      return image
    });

    const photos = images.map(img => ({ id: img.id, name: img.name, url: img.url }));

    await saveTableCache({ table: { ...cache, photos } }, sessionToken);

    this.setState({ fileList: images })
  }

  render() {
    const { previewVisible, previewImage, selectedId, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="ImageList clearfix">
        <FileList
          files={fileList}
          selectedId={selectedId}
          onSelect={this.handleSelectCard}
          onRemove={this.handleRemoveCard}
        />
        <Upload
          name="file"
          action="/api/file/upload"
          data={{
            from: 'table'
          }}
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
          showUploadList={false}
        >
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        {previewVisible &&
          <div>
            <img alt="미리보기" style={{ width: '100%' }} src={previewImage} />
          </div>
        }
      </div>
    );
  }
}