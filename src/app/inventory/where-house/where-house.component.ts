import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-where-house',
    templateUrl: './where-house.component.html',
    styleUrls: ['./where-house.component.scss']
})
export class WhereHouseComponent {
    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            styleClass: 'bg-indigo-500 text-white',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                { 
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-purple-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-purple-500 text-black',
                            style: ' border-radius: 12px'
                        },
                        {
                            label: 'Development',
                            styleClass: 'bg-purple-500 text-black',
                            style: ' border-radius: 12px'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-teal-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-teal-500 text-black'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: 'bg-teal-500 text-black'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    styleClass: 'bg-teal-500 text-white',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            styleClass: 'bg-purple-500 text-black'
                        },
                        {
                            label: 'UI/UX Design',
                            styleClass: 'bg-teal-500 text-black'
                        }
                    ]
                }
            ]
        }
    ];
}
