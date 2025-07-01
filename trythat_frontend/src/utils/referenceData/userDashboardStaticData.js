export const getUserOnboardingData = (screen) => {
   let payload = {};
   switch (screen) {
      case "companyDetails": {
         payload = {
            companyDetails: [
               {
                  name: "Company Name",
                  required: true,
                  type: "textfield",
                  type_placeholder: "Enter Company Name",
                  disabled: false,
                  invalidText: "Please provide Company Name",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Select Industry",
                  required: true,
                  type: "dropdown",
                  type_placeholder: "Select a type",
                  disabled: false,
                  invalidText: "Please select industry type",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
            ],
         };
         break;
      }
      case "personalDetails": {
         payload = {
            personalDetails: [
               {
                  name: "Company's Representative Name",
                  required: true,
                  type: "textfield",
                  type_placeholder: "Enter Company Name",
                  disabled: true,
                  invalidText: "Please provide Company's Representative Name",
                  value: "Prasoon Joshi",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Company's Representative Mobile No.",
                  required: true,
                  type: "textfield",
                  type_placeholder: "Enter Representative Mobile No.",
                  disabled: true,
                  invalidText: "Please provide Company's Mobile No.",
                  value: "+91 90875245782",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Company's Representative E-Mail Id",
                  required: true,
                  type: "textfield",
                  type_placeholder: "Enter Representative E-Mail Id",
                  disabled: true,
                  invalidText: "Please provide Company's Representative E-Mail Id",
                  value: "prasoon.joshi@jncgroup.com",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Personal E-mail Id",
                  required: true,
                  type: "textfield",
                  type_placeholder: "Please enter personal E-mail Id",
                  disabled: false,
                  invalidText: "Please provide personal E-Mail Id",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Designation",
                  required: false,
                  type: "textfield",
                  type_placeholder: "Enter Designation",
                  disabled: false,
                  invalidText: "Please Enter Designation",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Years of Experience",
                  required: false,
                  type: "textfield",
                  type_placeholder: "Enter Years of Experience",
                  disabled: false,
                  invalidText: "Please Enter Designation",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
               {
                  name: "Key Skills",
                  required: false,
                  type: "searchMultiTagSelect",
                  type_placeholder: "Select maximum 3 skills",
                  disabled: false,
                  invalidText: "Please Enter Designation",
                  value: "",
                  valueId: "",
                  valueArray: [],
               },
            ],
         };
         break;


      }

      default: 
      break;
   }

   // const payload = {

   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(payload);
      }, 2000);
   });
};
