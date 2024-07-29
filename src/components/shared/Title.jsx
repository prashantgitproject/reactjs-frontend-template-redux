import { Helmet } from 'react-helmet-async'

const Title = ({
    title = 'Ed Tech App',
    description = 'Welcome to the Edtech App!',
}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title