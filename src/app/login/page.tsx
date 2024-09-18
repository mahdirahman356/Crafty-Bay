import Link from "next/link";

const page = () => {
    return (
        <div className="min-h-screen bg-white text-slate-800 flex justify-center items-center">
            <div className="w-[90%] md:w-[50%] lg:w-[30%] border p-10 border-[#b4b3b3] rounded-sm">
                <form className="space-y-9">
                    <h3 className="text-2xl font-bold">Login</h3>
                    <div>
                        <input type="email" 
                        placeholder="Email Address" 
                        className="bg-white grow w-full pl-1 py-3 border-b-2 border-gray-300 pb-1 focus:border-primary outline-none rounded-none" />
                    </div>

                    <div>
                        <input 
                        type="password" 
                        placeholder="Password" 
                        className="bg-white grow w-full pl-1 py-3 border-b-2 border-gray-300 pb-1 focus:border-primary outline-none rounded-none" />
                    </div>

                    <button className="btn w-full rounded-none text-white btn-primary">
                        Login
                    </button>

                    <p className="text-sm text-center">Do not have an account ? <span className="text-primary underline"><Link href={"/signup"}>create account</Link></span></p>

                </form>
            </div>
        </div>
    );
};

export default page;