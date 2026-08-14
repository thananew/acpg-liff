import type { UserRole } from "./shared";

export type RegisterRole = Extract<UserRole, "agent" | "borrower" | "customer">;

export interface RoleOption {
  id: RegisterRole;
  title: string;
  titleEn: string;
  badge: string;
  description: string;
  features: string[];
  recommendedTag?: string;
}

export interface RegisterFormData {
  role: RegisterRole;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Role specific fields
  agentLicenseNo?: string;
  companyName?: string;
  borrowerIncome?: string;
  interestedProject?: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "agent",
    title: "นายหน้า / ตัวแทนขาย",
    titleEn: "Real Estate Agent",
    badge: "Agent",
    description: "สำหรับตัวแทนอสังหาริมทรัพย์และพาร์ทเนอร์ที่ต้องการเสนอขายหรือส่งต่อลูกค้า",
    features: [
      "ส่งต่อรายชื่อลูกค้าเพื่อรับค่าคอมมิชชั่น",
      "ติดตามสถานะเคสของลูกค้าแบบ Real-time",
      "ดาวน์โหลดเอกสารและสื่อประชาสัมพันธ์โครงการ"
    ]
  },
  {
    id: "borrower",
    title: "ผู้กู้ / ขอสินเชื่อ",
    titleEn: "Loan Borrower",
    badge: "Borrower",
    description: "สำหรับผู้ที่ต้องการยื่นขอสินเชื่อ ประเมินวงเงินกู้ หรือขอคำปรึกษาด้านการเงิน",
    features: [
      "ประเมินวงเงินกู้เบื้องต้นและคำนวณค่างวด",
      "ส่งเอกสารประกอบการสมัครสินเชื่อผ่าน LINE",
      "แจ้งเตือนสถานะการอนุมัติสินเชื่อแบบทันใจ"
    ]
  },
  {
    id: "customer",
    title: "ลูกค้าทั่วไป / ผู้สนใจ",
    titleEn: "General Customer",
    badge: "Customer",
    description: "สำหรับผู้สนใจซื้อโครงการ นัดหมายชมโครงการ หรือต้องการรับข่าวสารโปรโมชัน",
    features: [
      "รับสิทธิพิเศษและส่วนลดเฉพาะสมาชิก LINE OA",
      "จองคิวและนัดหมายเข้าชมโครงการอสังหาริมทรัพย์",
      "รับคำแนะนำจากเจ้าหน้าที่ฝ่ายขายโดยตรง"
    ]
  }
];
