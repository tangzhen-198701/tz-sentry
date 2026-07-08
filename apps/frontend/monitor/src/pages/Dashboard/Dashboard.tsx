import { useQuery } from '@tanstack/react-query'

import { AppSidebar } from '@/components/app-sidebar'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Dashboard() {
    const { data } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const res = await fetch('/api/application', {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token') ?? '',
                },
            })
            return res.json()
        },
    })

    const handleCreate = async () => {
        try {
            await fetch('/api/application', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'react',
                    name: 'react的应用' + Math.random(),
                }),
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token') ?? '',
                },
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <TooltipProvider>
            <SidebarProvider
                style={
                    {
                        '--sidebar-width': 'max-content',
                        '--header-height': 'calc(var(--spacing) * 12)',
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <SectionCards />
                                <div className="px-4 lg:px-6">
                                    <ChartAreaInteractive />
                                </div>
                                {data && <DataTable data={data?.data} />}
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleCreate}>创建应用</Button>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}
