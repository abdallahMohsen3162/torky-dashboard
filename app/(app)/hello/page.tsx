"use client";

import { useGetUsersAnalysesQuery } from "@/app/services/auth";
import { useDistributorsAnalysesQuery } from "@/app/services/distributors";
import { useSuppliersAnalysesQuery } from "@/app/services/suppliers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { 
  Users, 
  Truck, 
  Building2, 
  Package, 
  Loader2,
  CheckCircle,
  Banknote,
  Home,
  FileText
} from "lucide-react";

interface RoleCount {
  count: number;
  role: string;
}

export default function Page() {
  const [roleCounts, setRoleCounts] = useState<RoleCount[]>([]);
  const [suppliersCount, setSuppliersCount] = useState<number>(0);
  const [distributorsCount, setDistributorsCount] = useState<number>(0);
  
  const { data: usersAnal, isLoading: usersLoading, error: usersError } = useGetUsersAnalysesQuery();
  const { data: suppliersAnal, isLoading: suppliersLoading, error: suppliersError } = useSuppliersAnalysesQuery();
  const { data: distributorsAnal, isLoading: distributorsLoading, error: distributorsError } = useDistributorsAnalysesQuery();
  
  useEffect(() => {
    if (usersAnal) {
      console.log(usersAnal);
      setRoleCounts(usersAnal);
    }
  }, [usersAnal]);

  useEffect(() => {
    if (suppliersAnal && typeof suppliersAnal === 'number') {
      setSuppliersCount(suppliersAnal);
    } else if (suppliersAnal?.count) {
      setSuppliersCount(suppliersAnal.count);
    }
  }, [suppliersAnal]);

  useEffect(() => {
    if (distributorsAnal && typeof distributorsAnal === 'number') {
      setDistributorsCount(distributorsAnal);
    } else if (distributorsAnal?.count) {
      setDistributorsCount(distributorsAnal.count);
    }
  }, [distributorsAnal]);

  // Show error messages
  useEffect(() => {
    if (usersError) {
      toast.error("Failed to load users data");
    }
    if (suppliersError) {
      toast.error("Failed to load suppliers data");
    }
    if (distributorsError) {
      toast.error("Failed to load distributors data");
    }
  }, [usersError, suppliersError, distributorsError]);

  // Calculate total users from role counts
  const totalUsers = roleCounts?.reduce((sum, roleCount) => sum + roleCount.count, 0);
  
  const isAnyLoading = usersLoading || suppliersLoading || distributorsLoading;

  const LoadingSpinner = () => (
    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
  );

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    bgColor, 
    isLoading 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    bgColor: string; 
    isLoading: boolean;
  }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${bgColor} rounded-md flex items-center justify-center`}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Icon className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">
                {isLoading ? (
                  <div className="flex items-center">
                    <LoadingSpinner />
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  value || 0
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Loading overlay for the entire dashboard */}
      {isAnyLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <LoadingSpinner />
            <span className="ml-2 text-blue-700">Loading dashboard data...</span>
          </div>
        </div>
      )}

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Manage your users, suppliers, and distributors from this central dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-blue-900">Users</h2>
              </div>
              <p className="text-blue-700 mb-4">View and manage user accounts</p>
              <a
                href="/users"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View Users
              </a>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Building2 className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-green-900">Suppliers</h2>
              </div>
              <p className="text-green-700 mb-4">Manage supplier information and relationships</p>
              <a
                href="/suppliers"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Manage Suppliers
              </a>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Truck className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-purple-900">Distributors</h2>
              </div>
              <p className="text-purple-700 mb-4">Manage distributor network and partnerships</p>
              <a
                href="/distributors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                View Distributors
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          bgColor="bg-indigo-500"
          isLoading={usersLoading}
        />

        <StatCard
          title="Active Suppliers"
          value={suppliersCount}
          icon={Building2}
          bgColor="bg-green-500"
          isLoading={suppliersLoading}
        />

        <StatCard
          title="Active Distributors"
          value={distributorsCount}
          icon={Truck}
          bgColor="bg-purple-500"
          isLoading={distributorsLoading}
        />

        <StatCard
          title="Pending Orders"
          value={8}
          icon={Package}
          bgColor="bg-yellow-500"
          isLoading={false}
        />
      </div>

      {/* Role breakdown section */}
      {roleCounts?.length > 0 && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">User Role Breakdown</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roleCounts.map((roleCount, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {roleCount.role}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {roleCount.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Show loading state for role breakdown */}
      {usersLoading && (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <LoadingSpinner />
              <h2 className="text-lg font-semibold text-gray-900 ml-2">Loading User Role Breakdown...</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                      <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-8 h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}