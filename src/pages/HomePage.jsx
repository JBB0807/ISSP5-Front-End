// Page - Home
import { useEffect } from 'react';

const PageHome = () => {

    useEffect(()=>{
        document.title = 'Home';
    },[]);

    return (
        <main>
            <section>
                <h2>Home Page</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit porro, dolorem, quod facere enim voluptate provident quo labore vero repellat nemo animi ad exercitationem rem quos, possimus libero deleniti laudantium?</p>
            </section>
        </main>
    );

};

export default PageHome;