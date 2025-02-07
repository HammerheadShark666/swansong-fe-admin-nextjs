"use client";
 
import { memberDetailsSchema, MemberDetailsSchema } from "../validation/memberDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";  
import BirthPlaceSelect from "@/app/components/controls/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { saveNewMemberDetails } from "@/app/(secure)/members/actions/member";
import { saveExistingMemberDetails } from "@/app/(secure)/members/actions/member";
import { useRouter } from "next/navigation";
import Messages from "@/app/components/controls/messages";
import { Message } from "@/app/types/message";
import { Member } from "@/app/types/member/member";
import { formatString, selectKeyNumberToString } from "@/app/lib/stringHelper"; 
import { SelectItem } from "@/app/types/selectItem";
import { delayAlertRemove } from "@/app/lib/generalHelper"; 
import { isAddEditActionResponse } from "@/app/interfaces/addEditActionResponse";  
import { ACTION, MESSAGE_TYPE } from "@/app/lib/enums";
import { FE_MEMBER_EDIT } from "@/app/lib/urls";
import DatePicker from "@/app/components/controls/datepicker";
import { getDateOnly } from "@/app/lib/date";
import { setMessagesValue } from "@/app/lib/messageHelper";

interface IProps {
  action: ACTION;
  memberData?: Member;
  birthPlaceItems: SelectItem[]; 
  setShowSpinner: (show: boolean) => void;
}

export default function MemberDetailsForm({action, memberData, birthPlaceItems, setShowSpinner}: IProps) {
 
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);  
 
  const { trigger, control, register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<MemberDetailsSchema>({
    mode: 'onChange',
    resolver: zodResolver(memberDetailsSchema),
    defaultValues: {
      id: 0, 
      stageName: "",
      firstName: "",
      middleName: "",
      surname: "",
      birthPlaceId: "",
      dateOfBirth: "",
      dateOfDeath: ""      
    },    
  });  

  function setMemberValues(data: Member) {
    setValue("id", data.id);
    setValue("stageName", data.stageName);
    setValue("firstName", data.firstName);  
    setValue("middleName", data.middleName);
    setValue("surname", data.surname); 
    setValue("birthPlaceId", selectKeyNumberToString(data.birthPlaceId));
    setValue("dateOfBirth", getDateOnly(data.dateOfBirth));
    setValue("dateOfDeath", getDateOnly(data.dateOfDeath));
  } 

  function updatingExistingData(data: MemberDetailsSchema)
  {
    if(memberData != null) {
      memberData.stageName = data.stageName;
      memberData.firstName = data.firstName;
      memberData.middleName = data.middleName;
      memberData.surname = data.surname;   
      memberData.birthPlaceId = Number(data.birthPlaceId);
      memberData.dateOfBirth = data.dateOfBirth;
      memberData.dateOfDeath = data.dateOfDeath;
    }
  }

  useEffect(() => {    
    if(action === ACTION.EDIT && memberData != null && memberData != undefined)  {
      setMemberValues(memberData);
    }      
  });  

  const handleClearMessages = () => {
    setMessages([]);
  };

  async function addNewMember(data: MemberDetailsSchema)
  {
    const response = await saveNewMemberDetails(data); 
    if(isAddEditActionResponse(response)) 
      router.push(formatString(FE_MEMBER_EDIT, response.id)); 
    else  
      setMessages(response.messages);        
  }

  async function updateMember(data: MemberDetailsSchema)
  {
      updatingExistingData(data);  

      const response = await saveExistingMemberDetails(data); 
      if(isAddEditActionResponse(response)) 
      {
        setMessages([{ severity: MESSAGE_TYPE.INFO, text: "Member saved."}]);   
        delayAlertRemove().then(function() {
          setMessages([]);   
        });
      }      
      else
        setMessages(response.messages);     
  }

  const onSubmitForm: SubmitHandler<MemberDetailsSchema> = async (data) => { 

    setShowSpinner(true);
    setMessages([]); 

    try
    {
      if(action === ACTION.ADD)       
        await addNewMember(data);        
      else      
        await updateMember(data);      
    } 
    catch(error)
    {
      setMessagesValue(MESSAGE_TYPE.ERROR, error, setMessages);
    }

    setShowSpinner(false);
  }
 
  return (

    <form className="space-y-2 pb" onSubmit={handleSubmit(onSubmitForm)}>
  
      <Messages messages={messages} onClearMessages={handleClearMessages}></Messages>  

      <input {...register("id")} type="hidden" name="id" id="id" />       
 
      <div className="w-full flex flex-col lg:flex-row gap-4 space-y-0">

        <div className="w-full">
          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Stage Name*</label>
            <input {...register("stageName")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="stage name of member" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.stageName && errors.stageName.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Surname</label>
            <input {...register("surname")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="surname of member" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.surname && errors.surname.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">First Name</label>
            <input {...register("firstName")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="first name of member" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.firstName && errors.firstName.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-2 md:col-span-3">Middle Name</label>
            <input {...register("middleName")} type="text" maxLength={120} className="grid-cols-12 col-span-12 md:grid-cols-9 md:col-span-9" placeholder="middle name of member" />
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.middleName && errors.middleName.message}
            </p>
          </div>

          <div className="grid grid-cols-12">
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Birth Place</label>
            <BirthPlaceSelect trigger={trigger} name="birthPlaceId" className="grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5" register={register} items={birthPlaceItems} error={errors.birthPlaceId?.message} /> 
            <p className="error grid-cols-12 col-span-12 md:grid-cols-5 md:col-span-5 md:col-start-4 text-gray-900 mb-2">
              {errors.birthPlaceId && errors.birthPlaceId.message}
            </p>
          </div> 

        
          <div className="grid grid-cols-12 mb-2">        
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Date of birth</label> 
            <DatePicker name="dateOfBirth" control={control} />
          </div> 
          
          <div className="grid grid-cols-12">        
            <label className="grid-cols-12 col-span-12 md:grid-cols-3 md:col-span-3">Date of death</label> 
            <DatePicker name="dateOfDeath" control={control} />
          </div>
        </div>
      </div>      

      <div className="flex justify-end">
        <button disabled={isSubmitting} className="submit">
          {isSubmitting ? "Saving" : "Save"}          
        </button> 
      </div>  
    </form> 
)}