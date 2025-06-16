import mongoose from "mongoose";
import roles from "../../types/roles.type";
import hashPassword from "../hashPassword";
import bcrypt from "bcrypt";
import { IUser, UserJSON } from "../../Models/user.model";


interface IUser_wPassword extends IUser {
  password: string,
}

const createAgents = async (): Promise<IUser_wPassword[]> => {


  return [

    {
      _id: new mongoose.Types.ObjectId("681b2ac5fe184b03f44dcbcf"),
      firstName: 'Narjiss Didi',
      lastName: 'Alaoui',
      password: await hashPassword("admin"),
      email: "admin@gmail.com",
      phoneNumber: '+971 525002822',
      role: roles.ADMIN,

      adminInfo: {
        imageGallery: {
          folderId: "72b48f99-ca44-4ce1-bbd2-fe772cee9840",
          mainImage: {
            key: "tmp_dev/681b2ac5fe184b03f44dcbcf/property/72b48f99-ca44-4ce1-bbd2-fe772cee9840/agent4.jpg--1746783784055",
          },
          miniImage: {
            key: "tmp_dev/681b2ac5fe184b03f44dcbcf/property/72b48f99-ca44-4ce1-bbd2-fe772cee9840/agent4 - mini.jpg--1746782583815",
          }
        },
      },

      savedProperties: [],
    },




    {
      "_id": new mongoose.Types.ObjectId("6821b220bc4d00392204d5a2"),
      "firstName": "Mohamed",
      "lastName": "abdelkhalek",
      "email": "agent1@gmail.com",
      "phoneNumber": "+971501575572",
      "role": "agent",
      "agentInfo": {
        "imageGallery": {
          "mainImage": {
            "key": "tmp_dev/profile/mohamed abdelkhalek.jpg--1747038742924",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/mohamed%20abdelkhalek.jpg--1747038742924?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=aCpwZ~JfbF~Ri22~Hojt4Rl5jwQRbPn9IOhInCDjMs0gIQfi4H9eSxUZUcVWNEdf3TPlZ6nCzNM-TgcGSDoGNt0GQokqOCEGnavfUtNQmj5ZdO4UdSAcYWlMeOmbmmcJMFviB97gIKKZjq88wjmZx54MIo5Rp~lCMMU7FR4yqSa-8xL~33ui2He3eb7V82xSdDVd0mDgVTZHSJBJZhdPFkAYJZT8UEJbrHGmDpSJHXkBDMGT6eNKGwDwjmundkfA3cRYX2kwcEBONNog1jiNQxCMRb3uYppQP4P3kRbP9lC85Rugzj31C2tlRZ0mz96pfNVepPgyteOch1NtfGduog__"
          },
          "miniImage": {
            "key": "tmp_dev/profile/mohamed abdelkhalek mini.jpg--1747038746979",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/mohamed%20abdelkhalek%20mini.jpg--1747038746979?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=JNCXiAHDbHkFJg7h~8ihP8nVm0qk-ZdvT-uZiyO7EFpBtC9gZBGAxDWgWIfeyswgvWJfUFXWQ-zw4hFKgfKZdJLtsdEDful8hqUx6kDIAfmipDxf3xfULLIG~KIWxrajf2~IT9Qce30DMhV7ST9wusPCK-T8UerF47Xwd7hI1jSOkoLWC-aDcTIS~NFj2loKfLVX-tad-R5hB65xld0-A5NPJCTLWTTFjtMrqASt0p-9Z7QhHQ1pZzBGZmsB2avDfhzBa58IZNgq3fXv5xnIr0AbBU4UY3NjdzTlC1g3NNmRbIrLWscplMoRXE4R5URG~bEp2byJ4uZzeGGMREhe1w__"
          },
          "folderId": "43e031ee-c76a-43f8-b504-4dd367255560"
        },
        "clientsId": []
      },
      "savedProperties": [],
      password: await hashPassword("agent1"),
    },
    {
      "_id": new mongoose.Types.ObjectId("6821b247bc4d00392204d5a7"),
      "firstName": "Widad",
      "lastName": "Kristal",
      "email": "agent2@gmail.com",
      "phoneNumber": "+971504100867",
      "role": "agent",
      "agentInfo": {
        "imageGallery": {
          "mainImage": {
            "key": "tmp_dev/profile/widad kristal.jpg--1747038760291",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/widad%20kristal.jpg--1747038760291?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=bkTzK07aMelWcaJmLXaHO28zc9NN9uYqRkQSn0LBhZke97UBeftAQrRPswRUKyvlRK-8apvbPTR-GdItNVTvsaYM7z8x60zGVbHh-GIIuV0UaMGRrp3Hz3v-QLgu9clYdEPnvpeS7CTIWmBD289IWgP21CyfwCtIwB2eMIZvCXqjRemvt0Db9AmJONLxdFYOI897Lp97UovRc3TSJ73hfoCLWEasVKSR1uUi9iW6mt9qlBdETscH3GybC07o7syFz72fMn2R-O7V0xRs94QUECYX881AusHR9VMh7UC5AUezMr1IDAm-CDi~ePYGcF1nDXsOrP8SQTiDBnEsARRluw__"
          },
          "miniImage": {
            "key": "tmp_dev/profile/widad kristal mini.jpg--1747038762082",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/widad%20kristal%20mini.jpg--1747038762082?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=AoFcM~bQEvIaWoeFNhyjkJqVEsPei7ImV16nNK6Njb5yx8lNnsLGgpDUDlwW1yWgMcY4UOTIiJCTvOgjYxjRS1fVTVsX2HD~kwJ8VU8QXf6EUylHPCQylV7j2kWcqm1kGrZVQReJNXCNJi8EkRAUSVqFyl6IXWdxk3iw43I2UXomduU6qFKwOB1USwFZQGusgy4bu7sv3yZeuD7YupBTrz4zWIkfazja0cAN8NjOe9kYZY34HWpflgLAUDHuCw4n7T5qit1~CyonyGBCP1uUD2FnjtfHSFFs4ptts1a7BOg49ANsL8jcBSNCNv5QHTLx7l-NSB7wV1kRIoXVPtI7Iw__"
          },
          "folderId": "744fd2c7-5ecd-4410-9261-b33b75542ce9"
        },
        "clientsId": []
      },
      "savedProperties": [],
      password: await hashPassword("agent2"),
    },
    {
      "_id": new mongoose.Types.ObjectId("6821b26abc4d00392204d5ac"),
      "firstName": "Liakat",
      "lastName": "Ali",
      "email": "agent3@gmail.com",
      "phoneNumber": "+971585395994",
      "role": "agent",
      "agentInfo": {
        "imageGallery": {
          "mainImage": {
            "key": "tmp_dev/profile/liakat ali.jpg--1747038821188",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/liakat%20ali.jpg--1747038821188?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=yFFWeUUE8X02HCSrv~VxapwGRXexooAWkQdJU3oguVfBVk0WRLBgAbcn3a7YKguTKoUI5juNN7HsBNPzqSqEzzyemWpmq2V9nPW0efXPVKdZl1TpP9siM64LFPJaeoTQn90DVDL3QgrfTWZupJKhGmzuBx6bxd0SNhia9nT-~BNKapRi743EJXZ0s2-d3iRk6CEsAwg1VqGjEQghkv03DM~33~MX6PRD-Apf8atMNB6WdUYOX1CsIW3-sxaQzt9K439dXOtfgoicSjXtU4NFdTty9ZSC-LLm1-eFH5ZyyqFl40AjaONKTeEWgV~U9DMMMqi2sUxcESjQhBHImXUHWQ__"
          },
          "miniImage": {
            "key": "tmp_dev/profile/liakat ali mini.jpg--1747038824087",
            "url": "https://d2etj4vt6691zj.cloudfront.net/tmp_dev/profile/liakat%20ali%20mini.jpg--1747038824087?Expires=1747042516&Key-Pair-Id=K23HZ921W7Z3OO&Signature=LfSIQFVirwrqpfLXnEILqOly9m4Hd4W83nNBcUpJcB8uvDwg3xpMokAr1pKbNPBrCKAjeoqooXoBQ2imV8DoH3IMQGMJKZT-cA2TL8Tt1zZlwe2pszqCYc8XGTL1Wlu2e8kCYtskbpw-784tMrmzRlWeMaZXfOYtwJ9YQ5Ggifo5f7BCBKjx50fHIxqoYBQwq8stSerkCUdlYwHuZjjnVRe60iWT6RZTP2Fu4HG7CebcDFqk6iBmk~MiG-qnA~RzVQGpcDD8PYHlo7Ji62dNpxeu5laTWH7YGUTetZ7zZZ5eIFlb5IYKYCwlu6reMsaYRi3sJXYe~htXDykUjxJBTg__"
          },
          "folderId": "f32660b8-f547-40b4-9382-dd35a5d55fd4"
        },
        "clientsId": []
      },
      "savedProperties": [],
      password: await hashPassword("agent3"),
    }

  ];
};


export default createAgents;