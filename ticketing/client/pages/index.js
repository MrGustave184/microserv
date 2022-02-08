import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
    return currentUser ? 
        <h1>You are signed in</h1>
        : <h1>You are NOT signed in</h1>;
}

LandingPage.getInitialProps = async (context) => {
    // If we are on the server
    // if (typeof window === 'undefined') {
    //     // requests should be made to the ingress-nginx namespace
    //     /**
    //      * As we are in the server, in an isolated pod, we need to map the request
    //      * to ingress nginx
    //      * 
    //      * we also need to tell ingress-nginx the domain we are trying to reach
    //      * 
    //      * our headers objects acts as a proxy here. We receive the headers sent
    //      * by the browser through the request object and just pass them along
    //      */
    //     const { data } = await axios.get(
    //         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    //         {
    //             headers: req.headers
    //         }
    //     );

    //     return data;
    // } else {
    //     // If we are on the browser
    //     // we can use a base url of '' and let the 
    //     // browser define the base url
    //     const { data } = await axios.get('/api/users/currentuser');

    //     return data;
    // }
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
}

export default LandingPage;