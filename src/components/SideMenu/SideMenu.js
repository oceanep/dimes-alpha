import { useState, useEffect } from "react";
import {
    Icon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react"
import {
  MdHome,
  MdModeEdit,
  MdContacts,
  MdEventAvailable,
  MdSchedule

} from "react-icons/md"

import {
  Link
} from "react-router-dom";

import "./SideMenu.scss";

function SideMenu() {

  const data = [
    {
      title: 'Home',
      path: '/home',
      icon: MdHome,
      cName: 'nav-text',
      subMenu: []
    },
    {
      title: 'Availability',
      path: '/availability',
      icon: MdModeEdit,
      cName: 'nav-text',
        subMenu: [
        {
          title: 'Manage Availability',
          path: '/availability'
        },
        {
          title: 'Manage Event Types',
          path: '/events'
        }

        ]
    },
    {
      title: 'Contacts',
      path: '/contacts',
      icon: MdContacts,
      cName: 'nav-text',
      subMenu: [
        {
          title: 'Manage Relationships',
          path: '/relationships'
        },
        {
          title: 'Manage Groups',
          path: '/groups'
        }
      ]
    },
    {
      title: 'Plans',
      path: '/plans',
      icon: MdEventAvailable,
      cName: 'nav-text',
      subMenu: [
        {
          title: 'Initiated',
          path: '/initiated'
        },
        {
          title: 'Invites',
          path: '/invites'
        }
      ]
    },
    {
      title: 'Schedule',
      path: '/schedule',
      icon: MdSchedule,
      cName: 'nav-text',
      subMenu: false
    },
  ]

  return (
      <nav className='nav-menu'>
        <ul className='nav-menu-items'>
          {data.map((item, index) => {

              if (item.subMenu.length > 0) {
                return (
                  <Accordion allowMultiple>
                    <AccordionItem border="0px">
                      <li key={index} className={item.cName}>
                        <AccordionButton>
                          <Icon as={item.icon} boxSize={8}/>
                          <span>{item.title}</span>
                          <AccordionIcon />
                        </AccordionButton>
                      </li>
                      <AccordionPanel px="0px" py="0px">
                          <li className={`${item.cName} sub-text`}>
                            <Link fontSize="sm" to={item.subMenu[0].path}>
                              <span>{item.subMenu[0].title}</span>
                            </Link>
                          </li>
                          <li className={`${item.cName} sub-text`}>
                            <Link  fontSize="sm" to={item.subMenu[1].path}>
                              <span>{item.subMenu[1].title}</span>
                            </Link>
                          </li>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
                  <li key={index} className={item.cName}>
                    <Link fontSize="md" to={item.path}>
                      <Icon as={item.icon} boxSize={8} />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
        </ul>
      </nav>

  );
}

export default SideMenu;
