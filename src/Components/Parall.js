import * as React from 'react';
import { Parallax } from 'react-parallax';


const image1 =
"https://images.pexels.com/photos/1631678/pexels-photo-1631678.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";





function Parall() {

    return (
        <div>
        <Parallax bgImage={image1} strength={500}>
            <div style={{height:'600px'}}>
                <div style={{marginTop:'250px'}}>Hello World</div>
            </div>
        </Parallax>
        <div style={{height:'100vh'}}></div>
        </div>
    );
}

export default Parall;