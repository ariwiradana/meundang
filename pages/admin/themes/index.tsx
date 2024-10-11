import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import Loader from "@/components/admin/elements/loader";
import AdminLayout from "@/components/admin/layouts";
import { packageColors } from "@/constants/packageColors";
import { useAdminThemes } from "@/hooks/admin/useAdminThemes";
import { montserrat } from "@/lib/fonts";
import { Package } from "@/lib/types";
import { Pagination } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiDetail, BiEdit, BiPlus, BiTrash } from "react-icons/bi";

const ReviewDashboard: React.FC = () => {
  const { state, actions } = useAdminThemes();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Theme Dashboard</h1>
        <Link href="/admin/themes/create">
          <div>
            <ButtonPrimary
              size="small"
              title="Add"
              icon={<BiPlus className="text-lg" />}
            />
          </div>
        </Link>
        {state.isLoading ? (
          <Loader />
        ) : (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
              {state.themes.map((theme) => (
                <div key={theme.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <h1 className="text-gray-800 font-semibold text-sm">
                      {theme.name}
                    </h1>
                  </div>
                  <div className="py-3 flex flex-col gap-y-2">
                    <div>
                      <p className="text-gray-500 font-medium text-xs">
                        Category
                      </p>
                      <p className="text-gray-800 font-semibold text-sm">
                        {theme.category}
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-2 mt-1">
                        {theme.packages?.map((pk: Package) => (
                          <p
                            key={`package-${pk.id}`}
                            style={{
                              backgroundColor: `${packageColors[pk.name]}1A`,
                              color: packageColors[pk.name],
                            }}
                            className={`rounded-full font-semibold px-3 py-2 text-xs`}
                          >
                            {pk.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex justify-end gap-x-3">
                    <Link href={`/admin/themes/${theme.id}`}>
                      <ButtonPrimary
                        size="extrasmall"
                        title="Detail"
                        icon={<BiEdit className="text-base" />}
                      />
                    </Link>
                    <ButtonSecondary
                      type="button"
                      onClick={() => actions.handleDelete(theme.id as number)}
                      size="extrasmall"
                      title="Delete"
                      icon={<BiTrash className="text-base" />}
                    />
                  </div>
                </div>
              ))}
            </div>

            {state.toalRows > 0 && (
              <div className="border border-gray-200 rounded-xl hidden lg:block">
                <table className="table-auto overflow-x-auto w-full table">
                  <thead>
                    <tr>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                        Name
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Category
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Available Packages
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                        Actions
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.themes.map((theme, index) => (
                      <tr
                        key={theme.id}
                        className={`border-b ${
                          state.themes.length - 1 === index
                            ? "border-b-transparent"
                            : "border-b-gray-200"
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {theme.name}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {theme.category}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex gap-2">
                            {theme.packages?.map((pk: Package) => (
                              <p
                                key={`package-${pk.id}`}
                                style={{
                                  backgroundColor: `${
                                    packageColors[pk.name]
                                  }1A`,
                                  color: packageColors[pk.name],
                                }}
                                className={`text-white rounded-full font-semibold px-3 py-2 text-xs`}
                              >
                                {pk.name}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex gap-x-2">
                            <Link href={`/admin/themes/${theme.id}`}>
                              <ButtonPrimary
                                size="extrasmall"
                                title="Detail"
                                icon={<BiDetail className="text-base" />}
                              />
                            </Link>
                            <ButtonSecondary
                              type="button"
                              onClick={() =>
                                actions.handleDelete(theme.id as number)
                              }
                              size="extrasmall"
                              title="Delete"
                              icon={<BiTrash className="text-base" />}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {state.toalRows > state.limit && (
          <div className="mt-6 flex justify-center">
            <Pagination
              page={state.page}
              onChange={actions.handleChangePagination}
              count={Math.ceil(state.toalRows / state.limit)}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewDashboard;
