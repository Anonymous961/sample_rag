import React from 'react';

const Header = ({ title = "Nexus AI", subtitle = "Powered by FastAPI & React" }) => {
    return (
        <div className="px-8 py-6 border-b border-white/5 bg-gray-900/40 rounded-t-3xl flex flex-col gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span>
                {title}
            </h1>
            <p className="text-sm text-gray-400 font-normal">{subtitle}</p>
        </div>
    );
};

export default Header;
