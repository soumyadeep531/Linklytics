import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt, FaQrcode, FaTrash } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';

const ShortenItem = ({ id, originalUrl, shortUrl, clickCount, createdDate, onDelete, expiresAt }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
      );

    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    }

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
             const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`, {
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: "Bearer " + token,
                        },
                      });
            setAnalyticsData(data);
            setSelectedUrl("");
            console.log(data);
            
        } catch (error) {
            navigate("/error");
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this link?")) {
            try {
                await api.delete(`/api/urls/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (onDelete) onDelete(id);
            } catch (error) {
                console.error("Failed to delete link", error);
            }
        }
    };

  return (
    <div className={`bg-slate-100 shadow-lg border border-dotted  border-slate-500 px-6 sm:py-1 py-3 rounded-md  transition-all duration-100 `}>
    <div className={`flex sm:flex-row flex-col  sm:justify-between w-full sm:gap-0 gap-5 py-5 `}>
      <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden ">
        <div className="text-slate-900 pb-1 sm:pb-0   flex items-center gap-2 ">
            {/* <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
                target="_blank"
                className=" text-[17px]  font-montserrat font-[600] text-linkColor ">
                {subDomain + "/" + `${shortUrl}`}
            </a> */}

            <Link
              target='_'
              className='text-[17px]  font-montserrat font-[600] text-linkColor'
              to={import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}>
                  {subDomain + "/s/" + `${shortUrl}`}
            </Link>
            <FaExternalLinkAlt className="text-linkColor" />
            </div>

        <div className="flex items-center gap-1 ">
            <h3 className=" text-slate-700 font-[400] text-[17px] ">
              {originalUrl}
            </h3>
          </div>

          <div className="flex   items-center gap-8 pt-6 ">
            <div className="flex gap-1  items-center font-semibold  text-green-800">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clickCount}</span>
              <span className="text-[15px] ">
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
            {expiresAt && (
                <div className="flex items-center gap-2 font-semibold text-lg text-red-600">
                    <span><FaRegCalendarAlt /></span>
                    <span className="text-[17px]">
                        Expires: {dayjs(expiresAt).format("MMM DD, YYYY")}
                    </span>
                </div>
            )}
            </div>
        </div>

        <div className="flex  flex-1  sm:justify-end items-center gap-4 flex-wrap">
            <div
                onClick={() => setShowQR(!showQR)}
                className="flex cursor-pointer gap-1 items-center bg-green-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white "
            >
                <button>QR Code</button>
                <FaQrcode className="text-md" />
            </div>

            <CopyToClipboard
                onCopy={() => setIsCopied(true)}
                text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
            >
                <div className="flex cursor-pointer gap-1 items-center bg-btnColor py-2  font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white ">
                <button className="">{isCopied ? "Copied" : "Copy"}</button>
                {isCopied ? (
                    <LiaCheckSolid className="text-md" />
                ) : (
                    <IoCopy className="text-md" />
                )}
                </div>
            </CopyToClipboard>

            <div
                onClick={() => analyticsHandler(shortUrl)}
                className="flex cursor-pointer gap-1 items-center bg-blue-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white "
            >
                <button>Analytics</button>
                <MdAnalytics className="text-md" />
            </div>

            <div
                onClick={handleDelete}
                className="flex cursor-pointer gap-1 items-center bg-red-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white "
            >
                <button>Delete</button>
                <FaTrash className="text-md" />
            </div>
          </div>
        </div>

        {showQR && (
            <div className="flex justify-start sm:justify-end mt-4">
                <QRCodeCanvas value={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`} size={180} includeMargin={true} />
            </div>
        )}
    <React.Fragment>
        <div className={`${
            analyticToggle ? "flex flex-col" : "hidden"
          }  max-h-96 sm:mt-0 mt-5 min-h-96 relative  border-t-2 w-[100%] overflow-y-auto `}>
            {loader ? (
                <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
                    <div className="flex flex-col items-center gap-1">
                    <Hourglass
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                        />
                        <p className='text-slate-700'>Please Wait...</p>
                    </div>
                </div>
                ) : ( 
                    <>{analyticsData.length === 0 && (
                        <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                            <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                                No Data For This Time Period
                            </h1>
                            <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                                Share your short link to view where your engagements are
                                coming from
                            </h3>
                        </div>
                    )}
                        <Graph graphData={analyticsData} />
                        
                        {analyticsData.length > 0 && (
                            <div className="mt-6 w-full overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3">Timestamp</th>
                                            <th className="px-4 py-3">Location</th>
                                            <th className="px-4 py-3">Device</th>
                                            <th className="px-4 py-3">Browser</th>
                                            <th className="px-4 py-3">Referer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analyticsData.map((click, index) => (
                                            <tr key={index} className="bg-white border-b">
                                                <td className="px-4 py-3">{dayjs(click.clickDate).format("MMM DD, YYYY HH:mm")}</td>
                                                <td className="px-4 py-3">{click.city || 'Unknown'}, {click.country || 'Unknown'}</td>
                                                <td className="px-4 py-3">{click.deviceType || 'Unknown'}</td>
                                                <td className="px-4 py-3">{click.browser || 'Unknown'}</td>
                                                <td className="px-4 py-3">{click.referer || 'Direct'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                    )}
        </div>
    </React.Fragment>
    </div>
  )
}

export default ShortenItem