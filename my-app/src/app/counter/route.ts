import { NextResponse } from "next/server";

export async function POST(req : Request) {
    return NextResponse.json({message: "서버 함수 호출됨"});
}