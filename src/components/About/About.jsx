import aboutImg from "../../assets/assets/about.jpg"
import { ABOUT_TEXT } from "../../constants";
import { motion } from "framer-motion"
const About = () => {
    return (
        <div className="border-b border-neutral-900 pb-4">
            <div className="my-20 text-center  text-4xl">
                About Me
            </div>
            <div className="flex flex-wrap align-middle">
                <div className="w-full lg:w-1/2 lg:p-8">
                    <motion.div
                    whileInView={{opacity:1,x:0}}
                    initial={{opacity:0,x:-100}}
                    transition={{duration:0.5 }}
                     className="flex items-center justify-center">
                        <img className="rounded-xl" src={aboutImg} alt="" />
                    
                </motion.div>
                </div>
                    <motion.div
                     whileInView={{opacity:1,x:0}}
                     initial={{opacity:0,x:100}}
                     transition={{duration:0.5 }}
                     className="w-full lg:w-1/2">
                    <div className="flex items-center lg:justify-start">
                        <p className="my-2 max-w-xl py-6">{ABOUT_TEXT}</p>
                    </div>

                    </motion.div>

            </div>

        </div>
    );
};

export default About;