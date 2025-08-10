"use client";

import { useGetAllUsersQuery } from "@/app/services/auth";
import { useGetDistributorsQuery } from "@/app/services/distributors";
import GoogleMapEmbed from "@/components/Map";
import GoogleMapComponent from "@/components/Map";
import LocationMap from "@/components/Map";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800";
    case "Manager":
      return "bg-blue-100 text-blue-800";
    case "User":
      return "bg-gray-100 text-gray-800";
    case "Seller":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


const DistributorPopup = ({ userId, isOpen, onClose }: { userId: string, isOpen: boolean, onClose: () => void }) => {
  const { data: distributorData, isFetching, error } = useGetDistributorsQuery(
    { id: userId },
    { skip: !isOpen || !userId }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">تفاصيل الموزع</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {isFetching ? (
          <div className="text-center py-4">جاري تحميل تفاصيل الموزع...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            حدث خطأ أثناء تحميل تفاصيل الموزع
          </div>
        ) : distributorData ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">معلومات المستخدم</h3>
              <div className="flex items-center mb-4">
                <img
                  className="h-16 w-16 rounded-full object-cover mr-4"
                  src={distributorData.user.profileImage || "/default-avatar.png"}
                  alt={distributorData.user.name}
                />
                <div>
                  <p className="font-medium text-gray-900">{distributorData.user.name}</p>
                  <p className="text-gray-600">{distributorData.user.email}</p>
                  <p className="text-gray-600">{distributorData.user.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">الدور:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(distributorData.user.role)}`}>
                    {distributorData.user.role}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">الحالة:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    distributorData.user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {distributorData.user.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">معلومات الموزع</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">الاسم:</span>
                  <span className="ml-2 text-gray-900">{distributorData.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">الوصف:</span>
                  <span className="ml-2 text-gray-900">{distributorData.description}</span>
                </div>
            <div>
              <span className="font-medium text-gray-700">الموقع:</span>
              <span className="ml-2 text-gray-900">
                <a
                  href={`https://www.google.com/maps?q=${distributorData.latitude},${distributorData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <GoogleMapEmbed
                  latitude={25.276987}
                  longitude={55.296249}
                />
                  خط العرض: {distributorData.latitude}, خط الطول: {distributorData.longitude}
                </a>
              </span>
            </div>

                <div>
                  <span className="font-medium text-gray-700">تاريخ الإنشاء:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(distributorData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                الموردون ({distributorData.suppliers?.length || 0})
              </h3>
              {distributorData.suppliers && distributorData.suppliers.length > 0 ? (
                <div className="space-y-3">
                  {distributorData.suppliers.map((supplier: any) => (
                    <div key={supplier._id} className="border rounded-lg p-3">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded object-cover mr-3"
                          src={supplier.icon}
                          alt={supplier.name}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                          <p className="text-sm text-gray-600">{supplier.description}</p>
                          <p className="text-xs text-gray-500">
                            تاريخ الإنشاء: {new Date(supplier.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">لا يوجد موردون</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            لا توجد بيانات موزع
          </div>
        )}
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: users, isFetching } = useGetAllUsersQuery({ page, limit });

  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (users?.data) {
      setUsersList(users.data);
    }
  }, [users]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < (users?.totalPages || 1)) {
      setPage((prev) => prev + 1);
    }
  };

  const handleViewClick = (user: any) => {
    if (user.role === "Seller") {
      setSelectedUserId(user._id);
      setShowPopup(true);
    } else {
      toast.error("هذا المستخدم ليس بائعًا");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUserId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">المستخدمون</h1>
          <p className="text-gray-600 mt-1">
            إدارة حسابات وصلاحيات المستخدمين
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الهاتف
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الدور
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isFetching ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    جاري التحميل...
                  </td>
                </tr>
              ) : usersList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    لا يوجد مستخدمون
                  </td>
                </tr>
              ) : (
                usersList.map((user: any) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={user.profileImage || "/default-avatar.png"}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            المعرف: {user._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewClick(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              عرض{" "}
              <span className="font-medium">
                {(page - 1) * limit + 1}
              </span>{" "}
              إلى{" "}
              <span className="font-medium">
                {Math.min(page * limit, users?.total || 0)}
              </span>{" "}
              من <span className="font-medium">{users?.total || 0}</span> نتيجة
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-3 py-2 text-sm font-medium border rounded-md transition-colors ${
                  page === 1
                    ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                السابق
              </button>
              <span className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md">
                {page}
              </span>
              <button
                onClick={handleNext}
                disabled={page === (users?.totalPages || 1)}
                className={`px-3 py-2 text-sm font-medium border rounded-md transition-colors ${
                  page === (users?.totalPages || 1)
                    ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>

      <DistributorPopup 
        userId={selectedUserId || ''}
        isOpen={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
}
