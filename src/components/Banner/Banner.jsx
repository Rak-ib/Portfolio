import { HERO_CONTENT } from "../../constants/index";
import profile from "../../assets/assets/kevinRushProfile.jpg"
import { motion } from "framer-motion"
const Banner = () => {
    const Container=(d)=>({
        hidden:{x:-100 ,opacity:0},
        visible:{
            x:0,
            opacity:1,
            transition:{duration:0.5, delay:d}
        },
    })
    return (
        <div className="hero border-b border-neutral-900  min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-[200px] ">
                <motion.img
                transition={{duration:1,delay:0.6}}
                initial={{x:100,opacity:0}}
                animate={{x:0,opacity:1}}  
                    src={profile}
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div className="flex flex-col items-center lg:items-start">
                    <motion.h1
                    variants={Container(0)}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl font-thin pb-16 tracking-tight lg:mt-16 ">Box News!</motion.h1>
                    <motion.span
                    variants={Container(0.3)}
                    initial="hidden"
                    animate="visible"
                    className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                        Full Stack Developer
                    </motion.span>
                    <motion.p
                    variants={Container(0.6)}
                    initial="hidden"
                    animate="visible"
                     className="my-2 max-w-xl font-light">{HERO_CONTENT}</motion.p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div>
    );
};

export default Banner;