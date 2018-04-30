import { Upload, Icon, Modal } from 'antd';
import { saveTableCache, deletePhoto } from '../../utils/api';


const Card = ({ file }) => (
  <div className="ant-upload-list-item ant-upload-list-picture-card">
    <div className="ant-upload-list-item-info">
      <span>
        <a className="ant-upload-list-item-thumbnail" href={file.image}>
          <img src={`/image/${file.id}`} alt={file.name} />
        </a>
      </span>
    </div>
  </div>
)

class FileList extends React.Component {
  render() {
    const { files } = this.props;

    return (
      <div className="ant-upload-list ant-upload-list-picture-card">
        {files.map(file => <Card key={file.id} file={file} />)}
      </div>
    );
  }
}


export default class PicturesWall extends React.Component {

  constructor(props) {
    super(props);

    const { photos = [] } = props.cache;

    this.state = {
      previewVisible: false,
      previewImage: '',
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

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleRemove = async (file) => {
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
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <FileList files={fileList} />
        <Upload
          name="file"
          action="/api/file/upload"
          data={{
            from: 'table'
          }}
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          showUploadList={true}
        >
          {fileList.length >= 10 ? null : uploadButton}
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