/* eslint-disable @next/next/no-img-element */

const UserList = () => {
    
    return (
        <div>
            <div className="flex items-center gap-4">
                <img
                    className="object-cover w-10 h-10 rounded-full"
                    alt="user-image"
                    src="/image/user.avif" />
                <div>
                    <p className="font-semibold">Aryan Mahdi</p>
                    <p className="text-xs font-thin">Message</p>
                </div>
            </div>
        </div>
    );
};

export default UserList;