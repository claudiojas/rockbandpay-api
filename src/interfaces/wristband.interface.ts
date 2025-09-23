export interface ICreateWristband {
    code: string,
    qrCode: string
}

export interface IWristband {
    id: string,
    code: string,
    qrCode: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
}