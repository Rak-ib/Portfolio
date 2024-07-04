import { HERO_CONTENT } from "../../constants/index";
import profile from "../../assets/assets/kevinRushProfile.jpg"

const Banner = () => {
    return (
        <div className="hero border-b border-neutral-900  min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse gap-[200px] ">
                <img
                    src={profile}
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div className="flex flex-col items-center lg:items-start">
                    <h1 className="text-5xl font-thin pb-16 tracking-tight lg:mt-16 ">Box News!</h1>
                    <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                        Full Stack Developer
                    </span>
                    <p className="my-2 max-w-xl font-light">{HERO_CONTENT}</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;