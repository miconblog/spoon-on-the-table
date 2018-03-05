import Header from '../components/Header'
import stylesheet from 'antd/dist/antd.min.css'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  ]
)

export default Layout