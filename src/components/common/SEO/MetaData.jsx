import { Helmet } from "react-helmet";

const MetaData = ({ children, title="Safeone Chain", content="Safeone Chain" }) => {
    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <meta name="description" content={content} />
            <title>{title}</title>
        </Helmet>
        {children}
        </>
    );
}

export default MetaData