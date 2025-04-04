import React, { FC } from "react";
import Image from "next/image";

interface UserInfoProps {
    role: string;
    email: string | null;
    name: string | null;
}

const UserInfo: FC<UserInfoProps> = ({ role, email, name }) => {
    return (
        <div className="flex items-center">
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-9rounded-full ring-offset-2">
                    <Image
                        src={"/projet_collaborateur.png"}
                        alt={"user"}
                        width={40}
                        height={40}
                        className="rounded-full"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col ml-4">
                <span className="font-bold">{name}</span>
                <div className="text-sm opacity-50">{email}</div>
                <span className="text-sm text-gray-400">{role}</span>
            </div>
        </div>
    );
};

export default UserInfo;
