import React, { useEffect, useState }  from "react";


 const Home= (props)=>{
    const [count,setCount]=useState(1);
    useEffect(()=>{
        console.log("aaaa");
    },[count])
    console.log(props)
    return (
        <div>
            <p>{props.name} {count}</p>
            <button onClick={()=>setCount(count+1)}>Increase</button>
        </div>
    )
}

export default Home