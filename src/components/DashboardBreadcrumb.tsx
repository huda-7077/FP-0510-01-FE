import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface Crumb {
  href: string;
  label: string;
}

const DashboardBreadcrumb = ({
  route,
  crumb1,
  crumb2,
  crumb3,
  crumb4,
  crumb5,
  lastCrumb,
}: {
  route: "developer" | "admin" | "user";
  crumb1?: { href: string; label: string };
  crumb2?: { href: string; label: string };
  crumb3?: { href: string; label: string };
  crumb4?: { href: string; label: string };
  crumb5?: { href: string; label: string };
  lastCrumb: string;
}) => {
  const isMobile = useIsMobile();

  const getAllCrumbs = (): Crumb[] => {
    const crumbs: Crumb[] = [
      { href: `/dashboard/${route}`, label: "Dashboard" },
    ];
    [crumb1, crumb2, crumb3, crumb4, crumb5].forEach(
      (crumb) => crumb && crumbs.push(crumb),
    );
    return crumbs;
  };

  const allCrumbs = getAllCrumbs();
  const firstCrumb = allCrumbs[0];
  const lastCrumbObj = { href: "#", label: lastCrumb };
  const intermediateCrumbs = allCrumbs.slice(1);

  const getHierarchicalHref = (index: number): string => {
    const crumbsUpToIndex = allCrumbs.slice(0, index + 1);
    return crumbsUpToIndex.map((crumb) => crumb.href).join("/");
  };

  const getCrumbsForDropdown = (): Crumb[] =>
    intermediateCrumbs.length >= 2 ? intermediateCrumbs.slice(0, -1) : [];

  if (isMobile) {
    return (
      <Breadcrumb className="py-2 pl-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={firstCrumb.href}
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              {firstCrumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {intermediateCrumbs.length > 0 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {intermediateCrumbs.map((crumb, index) => (
                      <DropdownMenuItem key={index}>
                        <BreadcrumbLink
                          href={getHierarchicalHref(index + 1)}
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 max-w-48">
              {lastCrumbObj.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="py-2 pl-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={firstCrumb.href}
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            {firstCrumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {intermediateCrumbs.length > 0 && (
          <>
            <BreadcrumbSeparator />
            {intermediateCrumbs.length === 1 ? (
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={getHierarchicalHref(1)}
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  {intermediateCrumbs[0].label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {getCrumbsForDropdown().map((crumb, index) => (
                        <DropdownMenuItem key={index}>
                          <BreadcrumbLink
                            href={getHierarchicalHref(index + 1)}
                            className="font-semibold text-blue-600 hover:text-blue-800"
                          >
                            {crumb.label}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={getHierarchicalHref(intermediateCrumbs.length)}
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    {intermediateCrumbs[intermediateCrumbs.length - 1].label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </>
        )}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{lastCrumbObj.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
