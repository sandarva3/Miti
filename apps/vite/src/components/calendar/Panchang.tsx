import nepaliNumber from "@/helper/nepaliNumber"
import { NewCalendarData } from "@miti/types"
import NepaliDate from "nepali-datetime"

const PanchangTableRow = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <div className="flex justify-between">
      <p className="font-semibold">{label}:</p>
      <p>{value}</p>
    </div>
  )
}

const PanchangSection = ({
  title,
  children,
  classes,
}: {
  title: string
  children: React.ReactNode
  classes?: string
}) => {
  return (
    <div className={`my-8`}>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <div className={classes}>{children}</div>
    </div>
  )
}

const MuhuratItem = ({ name, time }: { name: string; time: string }) => {
  return (
    <li className="flex justify-between p-4 text-black text-start">
      <span>{name}</span>
      <span>{time}</span>
    </li>
  )
}
const Panchang = ({ data }: { data: NewCalendarData }) => {
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">पञ्चाङ्ग</h2>
      </div>
      <div>
        <PanchangTableRow
          label="तारिख"
          value={new NepaliDate(data.calendarInfo.dates.bs.full.en ?? "")
            .getDateObject()
            .toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        />

        <PanchangTableRow
          label="चन्द्र राशि"
          value={data.panchangaDetails?.chandraRashi.time.np ?? "-"}
        />
        <PanchangTableRow
          label="सूर्य राशि"
          value={data.panchangaDetails?.suryaRashi.np ?? "-"}
        />
        <PanchangTableRow label="नक्षत्र समाप्ति समय" value="१७:४३" />
        <PanchangTableRow
          label="करण १"
          value={data.panchangaDetails?.karans.first.np ?? "-"}
        />
        <PanchangTableRow
          label="करण २"
          value={data.panchangaDetails?.karans.second.np ?? "-"}
        />
        <PanchangTableRow
          label="ऋतु"
          value={data.hrituDetails?.title.np ?? "-"}
        />
        <PanchangTableRow
          label="पक्ष"
          value={data.panchangaDetails?.pakshya.np ?? "-"}
        />
        <PanchangTableRow
          label="योग"
          value={data.panchangaDetails?.yog.np ?? "-"}
        />
        <PanchangTableRow
          label="तिथि"
          value={
            (data.tithiDetails?.title.np ?? "-") +
            (data.tithiDetails?.display.np ?? "-")
          }
        />
      </div>

      {/* Shubh Muhurat Section */}
      <PanchangSection
        title="आजको शुभ साइत / मुहूर्त"
        classes="bg-orange-200 px-4 rounded-md text-start text-yellow-700"
      >
        {
          <ul className="flex flex-col gap-4 py-4 rounded-lg">
            {data.auspiciousMoments.sahits.length > 0
              ? data.auspiciousMoments.sahits.map((sahit) => (
                  <li>{sahit.title.np}</li>
                ))
              : "आज शुभ साइत / मुहूर्त छैन।"}
          </ul>
        }
      </PanchangSection>

      {/* Kala Muhurat Section */}
      <PanchangSection title="आजको काल / मुहूर्तम्">
        <ul className="divide-y divide-emerald-200 bg-emerald-100 rounded-lg">
          {data.auspiciousMoments.muhurats.map((muhurat) => {
            if (!muhurat.periodName || !muhurat.duration) return null
            return (
              <MuhuratItem name={muhurat.periodName} time={muhurat.duration} />
            )
          })}
        </ul>
      </PanchangSection>
    </div>
  )
}

export default Panchang
