import * as React from 'react';

export default class LayOut extends React.Component<any, any> {
    public render() {
        return (
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="bg-gray-800 text-white h-16">
                    <div className="flex items-center h-full px-4">
                        <div className="mr-4 font-semibold">Logo</div>
                        <nav className="flex gap-4">
                            <a href="#" className="px-3 py-2 hover:bg-gray-700 rounded transition-colors">1</a>
                            <a href="#" className="px-3 py-2 hover:bg-gray-700 rounded transition-colors">nav 2</a>
                            <a href="#" className="px-3 py-2 hover:bg-gray-700 rounded transition-colors">nav 3</a>
                        </nav>
                    </div>
                </header>

                {/* Main Layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <aside className="w-[200px] bg-white border-r">
                        <nav className="h-full py-4">
                            {/* 侧边菜单项保持空白,根据实际需求添加 */}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 flex flex-col">
                        <div className="p-6">
                            {/* Breadcrumb */}
                            <nav className="flex mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="hover:text-primary">Home</a>
                                    </li>
                                    <li className="inline-flex items-center">
                                        <span className="mx-2">/</span>
                                        <a href="#" className="hover:text-primary">List</a>
                                    </li>
                                    <li className="inline-flex items-center">
                                        <span className="mx-2">/</span>
                                        <span className="text-foreground">App</span>
                                    </li>
                                </ol>
                            </nav>

                            {/* Main Content */}
                            <div className="bg-white rounded-lg shadow p-6 min-h-[280px]">
                                Content
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}
