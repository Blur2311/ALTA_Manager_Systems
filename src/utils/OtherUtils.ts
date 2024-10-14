import { Timestamp } from "firebase/firestore";
import { formatTimestamp } from "./ServiceUtils";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export interface DownloadType {
  order: number;
  serviceName: string;
  provisionTime: Timestamp;
  status: string;
  supplySource: string;
}
export const exportToExcel = (data: DownloadType[]) => {
  // Chuyển đổi dữ liệu sang mảng chỉ chứa các trường cần thiết
  const formattedData = data.map((customer) => ({
    Order: customer.order,
    "Service Name": customer.serviceName,
    "Provision Time": formatTimestamp(customer.provisionTime),
    Status: customer.status,
    "Supply Source": customer.supplySource,
  }));

  // Tạo một worksheet từ dữ liệu đã format
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Tạo một workbook và thêm worksheet vào
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  // Xuất file với định dạng .xlsx
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Lưu file bằng FileSaver
  saveAs(dataBlob, "report_data.xlsx");
};
