import Link from "next/link";
import { krona_one } from "@/app/fonts";
import Burger from "./burger";

export default function Header() {
  return (
    <>
      <header className={krona_one.className}>
        <nav className=" relative flex items-center justify-between h-21 p-6 normal-size">
          <div className="">
            <Link href={"/"} prefetch={false}>
              <svg className="h-12" xmlns="http://www.w3.org/2000/svg" width="200" height="74" viewBox="0 0 200 74" fill="none">
                <path
                  d="M4.33594 6.47266H31.6406V11.9023H10.5273V19.8906H28.457V24.9883H10.5273V37H4.33594V6.47266ZM35.8203 21.6484C35.8203 19.3438 36.2435 17.2344 37.0898 15.3203C37.9362 13.4062 39.1211 11.7656 40.6445 10.3984C42.181 9.01823 44.0169 7.95052 46.1523 7.19531C48.3008 6.4401 50.6771 6.0625 53.2812 6.0625C55.8724 6.0625 58.2422 6.4401 60.3906 7.19531C62.5391 7.95052 64.375 9.01823 65.8984 10.3984C67.4349 11.7656 68.6263 13.4062 69.4727 15.3203C70.319 17.2344 70.7422 19.3438 70.7422 21.6484C70.7422 23.9661 70.319 26.0951 69.4727 28.0352C68.6263 29.9622 67.4349 31.6224 65.8984 33.0156C64.375 34.4089 62.5391 35.4961 60.3906 36.2773C58.2422 37.0456 55.8724 37.4297 53.2812 37.4297C50.6771 37.4297 48.3008 37.0456 46.1523 36.2773C44.0169 35.4961 42.181 34.4089 40.6445 33.0156C39.1211 31.6224 37.9362 29.9622 37.0898 28.0352C36.2435 26.0951 35.8203 23.9661 35.8203 21.6484ZM42.0117 21.6484C42.0117 23.224 42.2917 24.6432 42.8516 25.9062C43.4245 27.1693 44.2122 28.25 45.2148 29.1484C46.2305 30.0339 47.4219 30.7174 48.7891 31.1992C50.1693 31.681 51.6667 31.9219 53.2812 31.9219C54.8958 31.9219 56.3867 31.681 57.7539 31.1992C59.1341 30.7174 60.3255 30.0339 61.3281 29.1484C62.3307 28.25 63.1185 27.1693 63.6914 25.9062C64.2643 24.6432 64.5508 23.224 64.5508 21.6484C64.5508 20.0729 64.2643 18.6602 63.6914 17.4102C63.1185 16.1602 62.3307 15.1055 61.3281 14.2461C60.3255 13.3737 59.1341 12.7096 57.7539 12.2539C56.3867 11.7982 54.8958 11.5703 53.2812 11.5703C51.6667 11.5703 50.1693 11.7982 48.7891 12.2539C47.4219 12.7096 46.2305 13.3737 45.2148 14.2461C44.2122 15.1055 43.4245 16.1602 42.8516 17.4102C42.2917 18.6602 42.0117 20.0729 42.0117 21.6484ZM75.8203 21.6484C75.8203 19.3438 76.2435 17.2344 77.0898 15.3203C77.9362 13.4062 79.1211 11.7656 80.6445 10.3984C82.181 9.01823 84.0169 7.95052 86.1523 7.19531C88.3008 6.4401 90.6771 6.0625 93.2812 6.0625C95.8724 6.0625 98.2422 6.4401 100.391 7.19531C102.539 7.95052 104.375 9.01823 105.898 10.3984C107.435 11.7656 108.626 13.4062 109.473 15.3203C110.319 17.2344 110.742 19.3438 110.742 21.6484C110.742 23.9661 110.319 26.0951 109.473 28.0352C108.626 29.9622 107.435 31.6224 105.898 33.0156C104.375 34.4089 102.539 35.4961 100.391 36.2773C98.2422 37.0456 95.8724 37.4297 93.2812 37.4297C90.6771 37.4297 88.3008 37.0456 86.1523 36.2773C84.0169 35.4961 82.181 34.4089 80.6445 33.0156C79.1211 31.6224 77.9362 29.9622 77.0898 28.0352C76.2435 26.0951 75.8203 23.9661 75.8203 21.6484ZM82.0117 21.6484C82.0117 23.224 82.2917 24.6432 82.8516 25.9062C83.4245 27.1693 84.2122 28.25 85.2148 29.1484C86.2305 30.0339 87.4219 30.7174 88.7891 31.1992C90.1693 31.681 91.6667 31.9219 93.2812 31.9219C94.8958 31.9219 96.3867 31.681 97.7539 31.1992C99.1341 30.7174 100.326 30.0339 101.328 29.1484C102.331 28.25 103.118 27.1693 103.691 25.9062C104.264 24.6432 104.551 23.224 104.551 21.6484C104.551 20.0729 104.264 18.6602 103.691 17.4102C103.118 16.1602 102.331 15.1055 101.328 14.2461C100.326 13.3737 99.1341 12.7096 97.7539 12.2539C96.3867 11.7982 94.8958 11.5703 93.2812 11.5703C91.6667 11.5703 90.1693 11.7982 88.7891 12.2539C87.4219 12.7096 86.2305 13.3737 85.2148 14.2461C84.2122 15.1055 83.4245 16.1602 82.8516 17.4102C82.2917 18.6602 82.0117 20.0729 82.0117 21.6484Z"
                  fill="#2CA3A8"
                />
                <path
                  d="M64.3359 36.4727H91.6406V41.9023H70.5273V49.8906H88.457V54.9883H70.5273V67H64.3359V36.4727ZM97.6172 36.4727H123.613V41.9023H103.809V47.9961H121.348V53.0938H103.809V61.5898H124.023V67H97.6172V36.4727ZM132.324 57.918C133.431 58.543 134.551 59.1094 135.684 59.6172C136.829 60.112 138.014 60.5352 139.238 60.8867C140.462 61.2253 141.745 61.4857 143.086 61.668C144.44 61.8503 145.879 61.9414 147.402 61.9414C149.238 61.9414 150.801 61.8242 152.09 61.5898C153.379 61.3424 154.427 61.0104 155.234 60.5938C156.055 60.1641 156.647 59.6562 157.012 59.0703C157.389 58.4844 157.578 57.8464 157.578 57.1562C157.578 56.0495 157.116 55.1771 156.191 54.5391C155.267 53.888 153.841 53.5625 151.914 53.5625C151.068 53.5625 150.176 53.6211 149.238 53.7383C148.301 53.8424 147.35 53.9596 146.387 54.0898C145.436 54.2201 144.492 54.3438 143.555 54.4609C142.63 54.5651 141.758 54.6172 140.938 54.6172C139.57 54.6172 138.255 54.4414 136.992 54.0898C135.742 53.7383 134.629 53.2109 133.652 52.5078C132.689 51.8047 131.921 50.9258 131.348 49.8711C130.775 48.8164 130.488 47.5859 130.488 46.1797C130.488 45.3464 130.599 44.5195 130.82 43.6992C131.055 42.8789 131.419 42.0977 131.914 41.3555C132.422 40.6003 133.073 39.9036 133.867 39.2656C134.661 38.6146 135.618 38.0547 136.738 37.5859C137.871 37.1172 139.173 36.7526 140.645 36.4922C142.129 36.2188 143.815 36.082 145.703 36.082C147.07 36.082 148.444 36.1602 149.824 36.3164C151.204 36.4596 152.546 36.668 153.848 36.9414C155.163 37.2148 156.426 37.5469 157.637 37.9375C158.848 38.3151 159.974 38.7383 161.016 39.207L158.301 44.207C157.441 43.8294 156.517 43.4844 155.527 43.1719C154.538 42.8464 153.503 42.5664 152.422 42.332C151.341 42.0977 150.221 41.9154 149.062 41.7852C147.917 41.6419 146.745 41.5703 145.547 41.5703C143.841 41.5703 142.435 41.694 141.328 41.9414C140.234 42.1888 139.362 42.5078 138.711 42.8984C138.06 43.276 137.604 43.7057 137.344 44.1875C137.096 44.6562 136.973 45.125 136.973 45.5938C136.973 46.5052 137.383 47.2539 138.203 47.8398C139.023 48.4128 140.273 48.6992 141.953 48.6992C142.63 48.6992 143.405 48.6536 144.277 48.5625C145.163 48.4583 146.087 48.3477 147.051 48.2305C148.027 48.1133 149.017 48.0091 150.02 47.918C151.035 47.8138 152.018 47.7617 152.969 47.7617C154.766 47.7617 156.354 47.9635 157.734 48.3672C159.128 48.7708 160.293 49.3503 161.23 50.1055C162.168 50.8477 162.878 51.7526 163.359 52.8203C163.841 53.875 164.082 55.0599 164.082 56.375C164.082 58.1328 163.672 59.7018 162.852 61.082C162.044 62.4492 160.885 63.6081 159.375 64.5586C157.878 65.4961 156.068 66.2122 153.945 66.707C151.823 67.1888 149.46 67.4297 146.855 67.4297C145.137 67.4297 143.457 67.319 141.816 67.0977C140.176 66.8893 138.6 66.5898 137.09 66.1992C135.592 65.7956 134.16 65.3203 132.793 64.7734C131.439 64.2135 130.182 63.6016 129.023 62.9375L132.324 57.918ZM180.098 41.9023H168.828V36.4727H197.559V41.9023H186.289V67H180.098V41.9023Z"
                  fill="#2CA3A8"
                />
              </svg>
            </Link>
          </div>
          <div>
            <div className=" visible md:hidden ">
              <Burger />
            </div>
            <div className=" hidden md:block ">
              <ul className="flex justify-between gap-8 items-center">
                <li>
                  <Link href={"/lineup"} prefetch={false}>
                    <div className="hover:text-primaryColor transition-colors duration-200 ease-in-out">Line-up</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/timeTable"} prefetch={false}>
                    <div className="hover:text-primaryColor transition-colors duration-200 ease-in-out">Tidsplan</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/booking"} prefetch={false}>
                    <div className="hover:text-primaryColor transition-colors duration-200 ease-in-out">Billetter</div>
                  </Link>
                </li>
                <li>
                  <Link href={"/live"} prefetch={false}>
                    <div>
                      <svg className=" pulse transition duration-600 ease-in h-10 w-10 hover:fill-primaryColor" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 0 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                      </svg>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
