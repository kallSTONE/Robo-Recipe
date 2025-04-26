import {useState, useEffect} from 'react'
import logo from "../Images/chef.png";

export default function Header() {
    
    const [scrolled, setScrolled] = useState(false);
   
    useEffect(()=>{
        const onScroll =() =>{
            if(window.scrollY > 50)
                setScrolled(true);
            else{
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", onScroll)

        return () => window.removeEventListener("scroll" , onScroll)
    },[])


    return (
        <header className={scrolled? "headerScrolled": "headerPreScroll"}>
            <div className="firstPart">
                <img src={logo} className="chef-logo" alt="Globe logo" />
            </div>
            <a href="#featured">Featured</a>
        </header>
    )
  }