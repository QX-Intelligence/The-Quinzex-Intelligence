import React, { forwardRef } from 'react';
import { Sparkles, Brain, Rocket, Shield } from 'lucide-react';

export const InvitationCard = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: '800px',
                height: '600px',
                backgroundColor: '#0a0a0a',
                backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)',
                // Removed hidden styles for modal usage
                fontFamily: 'Space Mono, monospace', // Assuming Space Mono is available
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid hsl(42, 75%, 55%)',
                padding: '40px'
            }}
        >
            {/* Decorative Corners */}
            <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '4px solid hsl(42, 75%, 55%)', borderLeft: '4px solid hsl(42, 75%, 55%)' }} />
            <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '4px solid hsl(42, 75%, 55%)', borderRight: '4px solid hsl(42, 75%, 55%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '4px solid hsl(42, 75%, 55%)', borderLeft: '4px solid hsl(42, 75%, 55%)' }} />
            <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '4px solid hsl(42, 75%, 55%)', borderRight: '4px solid hsl(42, 75%, 55%)' }} />

            {/* Header */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <p style={{ color: 'hsl(42, 75%, 55%)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '14px', marginBottom: '10px' }}>
                    Official Invitation
                </p>
                <h1 style={{ fontSize: '60px', fontWeight: 'bold', margin: 0, textShadow: '0 0 40px rgba(204, 154, 6, 0.3)' }}>
                    FUTURE ACCESS
                </h1>
                <p style={{ opacity: 0.6, letterSpacing: '0.1em', marginTop: '10px' }}>
                    You are invited to witness the extraordinary
                </p>
            </div>

            {/* Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%', maxWidth: '600px' }}>
                {[
                    { icon: <Sparkles size={24} color="hsl(42, 75%, 55%)" />, title: "Premium Design", desc: "Gold Standard Aesthetics" },
                    { icon: <Brain size={24} color="hsl(42, 75%, 55%)" />, title: "Intelligence", desc: "Powered by Advanced AI" },
                    { icon: <Rocket size={24} color="hsl(42, 75%, 55%)" />, title: "Performance", desc: "Lightning Fast Speed" },
                    { icon: <Shield size={24} color="hsl(42, 75%, 55%)" />, title: "Engineering", desc: "Built to Last" }
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                        {item.icon}
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{item.title}</h3>
                            <p style={{ fontSize: '12px', opacity: 0.5, margin: 0 }}>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '80px', height: '80px', background: '#fff', padding: '5px' }}>
                    {/* Placeholder QR */}
                    <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '8px', textAlign: 'center' }}>
                        SCAN TO<br />ENTER
                    </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'hsl(42, 75%, 55%)', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>QUINZEX INTELLIGENCE</p>
                    <p style={{ opacity: 0.5, fontSize: '12px', margin: '5px 0 0 0' }}>Est. 2026 | Digital Excellence Collective</p>
                </div>
            </div>

        </div>
    );
});

InvitationCard.displayName = 'InvitationCard';
export default InvitationCard;
