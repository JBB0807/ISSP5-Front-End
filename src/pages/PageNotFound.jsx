// Page - Not Found
import { useEffect } from 'react';

const PageNotFound = () => {

    useEffect(()=>{
        document.title = 'Page Not Found';
    },[]);

    return (
        <main>
            <section>
                <h2>404</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit porro, dolorem, quod facere enim voluptate provident quo labore vero repellat nemo animi ad exercitationem rem quos, possimus libero deleniti laudantium?</p>
            </section>
        </main>
    );

};

export default PageNotFound;