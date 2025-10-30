"use client"; // 이 파일만 클라이언트에서 실행됨

export default function Button({ onClick, children }: any) {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  );
}
